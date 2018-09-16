webpackJsonp([0],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fidj__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_animations__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_shared_card_model__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_shared_profile_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, profile, fidjService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.profile = profile;
        this.fidjService = fidjService;
        this.cardSelected = 0;
        this.cards = [];
        this.dataContainer = {
            cards: this.cards
        };
        this.profile.readyForSync.subscribe(function (ready) {
            if (ready === true && _this.fidjService.isLoggedIn()) {
                _this.doRefresh();
            }
        }, function (err) {
            console.error('Error: ' + err);
        }, function () {
            console.log('Completed', _this.cards);
        });
    }
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.fidjService.sync(function () {
            var i0 = 0, i1 = 1;
            for (var i = 0; i < 12; i++) {
                var i1_old = i1;
                i1 = i1 + i0;
                if (i0 === 1 && i1_old === 1) {
                    _this.cards.push(new __WEBPACK_IMPORTED_MODULE_4__app_shared_card_model__["a" /* Card */]('?', []));
                }
                else {
                    _this.cards.push(new __WEBPACK_IMPORTED_MODULE_4__app_shared_card_model__["a" /* Card */]('' + i0, []));
                }
                i0 = i1_old;
            }
            _this.fidjService.put(_this.dataContainer);
        })
            .then(function () {
            // refresh settings
            _this.profile.setRoles(_this.fidjService.getRoles());
            _this.profile.setEndpoints(_this.fidjService.getEndpoints());
            return _this.fidjService.findAll();
        })
            .then(function (all) {
            if (all.length) {
                _this.dataContainer = all[0];
                _this.cards = _this.dataContainer.cards;
                _this.profile.setDataToShare(_this.cards);
                _this.goUp();
                console.log('this.cards', _this.cards);
            }
            if (refresher)
                refresher.complete();
        })
            .catch(function (err) {
            // alert(JSON.stringify(err));
            console.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
            if (refresher) {
                refresher.complete();
            }
            if (err && err.code === 403) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
            }
        });
    };
    HomePage.prototype.cardTapped = function ($event, $index, card) {
        this.cardSelected = $index + 1;
        if (!$index)
            this.cardSelected = this.cards.indexOf(card) + 1;
    };
    HomePage.prototype.goUp = function () {
        this.cardSelected = 0;
    };
    HomePage.prototype.add = function (cardS, story) {
        var selectedCard = this.cards[cardS - 1];
        selectedCard.comments.push(story);
        console.log(this.dataContainer);
        this.fidjService.put(this.dataContainer);
    };
    HomePage.prototype.remove = function (cardS, index) {
        var selectedCard = this.cards[cardS - 1];
        selectedCard.comments.splice(index, 1);
        this.fidjService.put(this.dataContainer);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/travis/build/ofidj/agile-pokr/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Agile-Poker</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n\n    <ion-slides [@cardsState]="(!cardSelected)">\n        <ion-slide *ngFor="let card of cards"\n                   (click)="cardTapped($event, $index, card)">\n            <h1 [ngStyle]="{\'font-size.em\' : (card.value >= 10) ? 11 : 22}">{{card.value}}</h1>\n        </ion-slide>\n    </ion-slides>\n\n    <div *ngIf="cardSelected">\n\n        <ion-grid>\n            <ion-row justify-content-center>\n                <ion-col col-3 style="text-align: center">\n                    <button ion-button color="dark" outline (click)="goUp(null)">{{cards[cardSelected - 1].value}}\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n\n        <ion-list>\n            <ion-item>\n                <ion-input type="text" placeholder="Add a new story" [(ngModel)]="story" name="story"></ion-input>\n                <button ion-button clear (click)="add(cardSelected, story); story = null;" item-end icon-only>\n                    <ion-icon name="add"></ion-icon>\n                </button>\n            </ion-item>\n\n            <ion-item-sliding *ngFor="let comment of cards[cardSelected - 1].comments">\n                <ion-item>\n                    <span style="white-space: normal;">{{comment}}</span>\n                </ion-item>\n                <ion-item-options side="right">\n                    <button ion-button color="danger">\n                        <ion-icon name="trash" (click)="remove(cardSelected, $index)"></ion-icon>\n                    </button>\n                </ion-item-options>\n            </ion-item-sliding>\n        </ion-list>\n\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/ofidj/agile-pokr/src/pages/home/home.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["j" /* trigger */])('cardsState', [
                    Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["g" /* state */])('true', Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({
                        height: '100%',
                        transform: 'scale(1)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["g" /* state */])('false', Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({
                        height: '0%',
                        transform: 'scale(0.1)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["i" /* transition */])('true => false', Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["e" /* animate */])('1000ms ease-in')),
                    Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["i" /* transition */])('false => true', Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["e" /* animate */])('1ms ease-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__app_shared_profile_service__["a" /* Profile */],
            __WEBPACK_IMPORTED_MODULE_2_fidj__["b" /* FidjService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 122;

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Storage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fidj__ = __webpack_require__(35);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Storage = /** @class */ (function (_super) {
    __extends(Storage, _super);
    function Storage() {
        return _super.call(this, window.localStorage, 'agile-poker.') || this;
    }
    Storage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Storage);
    return Storage;
}(__WEBPACK_IMPORTED_MODULE_1_fidj__["c" /* LocalStorage */]));

//# sourceMappingURL=storage.service.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return version; });
var version = '18.2.50';
//# sourceMappingURL=version.const.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fidj__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_shared_profile_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_shared_version_const__ = __webpack_require__(218);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, loadingCtrl, profile, fidjService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.profile = profile;
        this.fidjService = fidjService;
        this.appVersion = __WEBPACK_IMPORTED_MODULE_5__app_shared_version_const__["a" /* version */];
    }
    ProfilePage.prototype.logout = function () {
        var _this = this;
        this.fidjService.logout()
            .then(function () {
            _this.profile.logout();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        })
            .catch(function (err) {
            alert(JSON.stringify(err));
            _this.profile.logout();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        });
    };
    ProfilePage.prototype.callEndpoint = function (endpoint) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        var data = { data: this.profile.getDataToShare() };
        this.fidjService.postOnEndpoint(endpoint.key, data)
            .then(function (result) {
            _this.endpointResult = JSON.stringify(result);
            loader.dismissAll();
        })
            .catch(function (err) {
            loader.dismissAll();
            _this.endpointResult = 'Error : ' + err.code + ' - ' + err.reason;
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/travis/build/ofidj/agile-pokr/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Agile-Poker</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <p style="text-align:right">\n\n        <a ion-button icon-start round outline color="primary"\n           href="https://github.com/ofidj/agile-poker" target="_blank">\n            <ion-icon name="logo-github"></ion-icon>\n            Contribute<br>@{{appVersion}}\n        </a>\n\n    </p>\n\n    <ion-list>\n        <ion-list-header>\n            Profile\n        </ion-list-header>\n\n        <ion-item>\n            <ion-avatar item-start>\n                <ion-icon name="contact"></ion-icon>\n            </ion-avatar>\n            <h2>{{profile.getEmail()}}</h2>\n            <p *ngFor="let role of profile.getRoles()">{{role}}</p>\n        </ion-item>\n\n        <ion-item *ngFor="let endpoint of profile.getEndpoints()"\n                  (click)="callEndpoint(endpoint)">\n            {{endpoint.key}}\n            <ion-icon name="arrow-forward" item-end></ion-icon>\n        </ion-item>\n\n    </ion-list>\n\n    <ion-card>\n        <ion-card-content>\n            {{endpointResult}}\n        </ion-card-content>\n    </ion-card>\n\n    <p style="text-align:center">\n        <button ion-button color="danger" (click)="logout()">logout</button>\n    </p>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/ofidj/agile-pokr/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__app_shared_profile_service__["a" /* Profile */],
            __WEBPACK_IMPORTED_MODULE_2_fidj__["b" /* FidjService */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(241);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Refresher */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fidj__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_profile_service__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, loadingCtrl, network, profile, fidjService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.profile = profile;
        this.fidjService = fidjService;
        this.rootPage = null;
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Poker', component: __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */] },
            { title: 'Player', component: __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["a" /* ProfilePage */] },
        ];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.initFidj()
                .then(function () {
                _this.splashScreen.hide();
                loader.dismissAll();
            });
            // this.nav.setRoot(LoginPage);
            _this.connected = _this.network.onConnect().subscribe(function (data) {
                _this.initFidj();
            }, function (error) {
                console.error(error);
            });
        });
    };
    MyApp.prototype.ngOnDestroy = function () {
        this.connected.unsubscribe();
    };
    MyApp.prototype.initFidj = function () {
        var _this = this;
        return this.fidjService.init('test', { prod: true })
            .then(function () {
            _this.connected.unsubscribe();
            _this.profile.readyForSync.next(true);
            if (_this.fidjService.isLoggedIn()) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
            }
            else {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]);
            }
            return Promise.resolve();
        })
            .catch(function (err) {
            // alert(JSON.stringify(err));
            _this.profile.readyForSync.next(false);
            if (_this.fidjService.isLoggedIn()) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
            }
            else {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]);
            }
            return Promise.resolve();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/ofidj/agile-pokr/src/app/app.html"*/'<ion-menu [content]="content" *ngIf="profile.readyForSync | async">\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/travis/build/ofidj/agile-pokr/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_9__shared_profile_service__["a" /* Profile */],
            __WEBPACK_IMPORTED_MODULE_5_fidj__["b" /* FidjService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
var Card = /** @class */ (function () {
    function Card(value, comments) {
        this.value = value;
        this.comments = comments;
    }
    return Card;
}());

//# sourceMappingURL=card.model.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fidj__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__storage_service__ = __webpack_require__(217);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_5_fidj__["a" /* FidjModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__profile_service__["a" /* Profile */],
                __WEBPACK_IMPORTED_MODULE_7__storage_service__["a" /* Storage */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_5_fidj__["a" /* FidjModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* NgStyle */]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Profile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_service__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Profile = /** @class */ (function () {
    function Profile(_storage) {
        this._storage = _storage;
        // console.log('Profile service');
        this.email = this._storage.get('email') || null;
        this.readyForSync = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.roles = [];
        this.endpoints = [];
    }
    Profile.prototype.getEmail = function () {
        return this.email;
    };
    Profile.prototype.setEmail = function (email) {
        this.email = email;
        this._storage.set('email', this.email);
    };
    Profile.prototype.logout = function () {
        this._storage.remove('email');
    };
    Profile.prototype.getRoles = function () {
        return this.roles;
    };
    Profile.prototype.setRoles = function (roles) {
        this.roles = roles;
    };
    Profile.prototype.getEndpoints = function () {
        return this.endpoints;
    };
    Profile.prototype.setEndpoints = function (endpoints) {
        this.endpoints = endpoints;
    };
    Profile.prototype.getDataToShare = function () {
        return this.dataToShare;
    };
    Profile.prototype.setDataToShare = function (data) {
        this.dataToShare = data;
    };
    Profile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__storage_service__["a" /* Storage */]])
    ], Profile);
    return Profile;
}());

//# sourceMappingURL=profile.service.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fidj__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_shared_profile_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_shared_version_const__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, network, profile, fidjService) {
        this.navCtrl = navCtrl;
        this.network = network;
        this.profile = profile;
        this.fidjService = fidjService;
        this.appVersion = __WEBPACK_IMPORTED_MODULE_5__app_shared_version_const__["a" /* version */];
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.fidjService.isLoggedIn()) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
        this.connected = this.network.onConnect().subscribe(function (data) {
            console.log(data);
            if (_this.fidjService.isLoggedIn()) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }
        }, function (error) { return console.error(error); });
    };
    LoginPage.prototype.ngOnDestroy = function () {
        this.connected.unsubscribe();
    };
    LoginPage.prototype.login = function (email, pwd) {
        var _this = this;
        this.profile.setEmail(email);
        this.fidjService.login(email, pwd)
            .then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        })
            .catch(function (err) {
            alert(JSON.stringify(err));
            console.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        });
    };
    LoginPage.prototype.loginAsDemo = function () {
        var _this = this;
        this.profile.setEmail('demo user');
        this.fidjService.loginAsDemo()
            .then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        })
            .catch(function (err) { return alert(JSON.stringify(err)); });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/travis/build/ofidj/agile-pokr/src/pages/login/login.html"*/'<ion-content padding>\n\n\n    <ion-grid>\n        <ion-row justify-content-center>\n            <ion-col col-md-8>\n                <ion-card style="background-color:transparent">\n                    <ion-card-header style="color:white;">\n                        <h1 style="color:white; text-align: center">Agile-Poker</h1>\n                        <ul>\n                            <li>This simple agile poker planning app helps you to exchange on feature\'s value with your\n                                team.\n                            </li>\n                            <li>Estimate and show card value or cost of each item.</li>\n                            <li>Store feature linked to value.</li>\n                        </ul>\n                    </ion-card-header>\n                    <ion-card-content>\n\n                        <form #heroForm="ngForm">\n                            <ion-item>\n                                <ion-input\n                                        id="userLoginEmail"\n                                        type="email" placeholder="valid.email@required.com" required\n                                        [(ngModel)]="userLoginEmail" name="userLoginEmail"\n                                        pattern=".{1,}@[_a-z0-9A-Z]+(\.[a-z0-9A-Z]+)+"></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input\n                                        id="userLoginPassword"\n                                        type="password" placeholder="password"\n                                        [(ngModel)]="userLoginPassword" name="userLoginPassword"\n                                        required></ion-input>\n                            </ion-item>\n\n                            <div style="padding-top:20px">\n                                <button ion-button block\n                                        id="userLoginButton"\n                                        (click)="login(userLoginEmail, userLoginPassword)"\n                                        [disabled]="!userLoginEmail || !heroForm.form.valid || !userLoginPassword">\n                                    Login\n                                </button>\n                                <br><br>\n                                <a ion-button block color="light" clear\n                                   href="https://fidj.ovh/forgot"\n                                   target="_blank">\n                                    Forgot your login/password ?</a>\n                                <a ion-button block color="light" clear\n                                   (click)="loginAsDemo()">\n                                    Test as a demo user...\n                                </a>\n                            </div>\n                        </form>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <span style="float:right;font-size:10px;" app-version>version: {{appVersion}}</span>\n\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/ofidj/agile-pokr/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_4__app_shared_profile_service__["a" /* Profile */],
            __WEBPACK_IMPORTED_MODULE_2_fidj__["b" /* FidjService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[220]);
//# sourceMappingURL=main.js.map
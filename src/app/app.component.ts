import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Network} from '@ionic-native/network';
import {Subscription} from "rxjs/Subscription";
import {LoadingController} from 'ionic-angular';
import {FidjService} from "fidj";


import {HomePage} from '../pages/home/home';
import {ProfilePage} from "../pages/profile/profile";
import {LoginPage} from "../pages/login/login";
import {Profile} from "./shared/profile.service";

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = null;
    connected: Subscription;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public loadingCtrl: LoadingController,
                private network: Network,
                public profile: Profile,
                private fidjService: FidjService) {

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Poker', component: HomePage},
            {title: 'Player', component: ProfilePage},
        ];

        this.initializeApp();
    }

    initializeApp() {

        const loader = this.loadingCtrl.create({
            content: "Please wait...",
            // duration: 3000
        });
        loader.present();
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.initFidj()
                .then(() => {
                    this.splashScreen.hide();
                    loader.dismissAll();
                })
            // this.nav.setRoot(LoginPage);

            this.connected = this.network.onConnect().subscribe(data => {
                this.initFidj();
            }, error => {
                console.error(error);
            });

        });
    }

    ngOnDestroy() {
        this.connected.unsubscribe();
    }

    initFidj() : Promise<any> {

        return this.fidjService.init('getYourFidjId')
            .then(() => {
                this.connected.unsubscribe();
                this.profile.readyForSync.next(true);
                if (this.fidjService.isLoggedIn()) {
                    this.nav.setRoot(HomePage);
                } else {
                    this.nav.setRoot(LoginPage);
                }
                return Promise.resolve();
            })
            .catch((err) => {
                // alert(JSON.stringify(err));
                this.profile.readyForSync.next(false);
                if (this.fidjService.isLoggedIn()) {
                    this.nav.setRoot(HomePage);
                } else {
                    this.nav.setRoot(LoginPage);
                }
                return Promise.resolve();
            });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}

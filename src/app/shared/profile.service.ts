import {Injectable} from "@angular/core";
import {Storage} from "./storage.service";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {EndpointInterface} from "fidj/sdk/interfaces";

@Injectable()
export class Profile {

    private email: string;
    private roles: Array<string>;
    private endpoints: Array<EndpointInterface>;
    private dataToShare: any;

    public readyForSync: BehaviorSubject<boolean>;

    constructor(private _storage: Storage) {
        // console.log('Profile service');
        this.email = this._storage.get('email') || null;
        this.readyForSync = new BehaviorSubject<boolean>(false);
        this.roles = [];
        this.endpoints = [];
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
        this._storage.set('email', this.email);
    }

    logout() {
        this._storage.remove('email');
    }

    getRoles(): Array<string> {
        return this.roles;
    }

    setRoles(roles: Array<string>): void {
        this.roles = roles;
    }

    getEndpoints(): Array<EndpointInterface> {
        return this.endpoints;
    }

    setEndpoints(endpoints: Array<EndpointInterface>): void {
        this.endpoints = endpoints;
    }

    getDataToShare(): any {
        return this.dataToShare;
    }

    setDataToShare(data: any) {
        this.dataToShare = data;
    }

}


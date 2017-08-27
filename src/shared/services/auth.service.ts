import {Injectable} from "@angular/core";

import {IUser, UserType} from "../model";
import {AuthService} from "angular2-social-login";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LocationAuthService extends AuthService {
    private user: IUser = {
        userType: UserType.GUEST,
    };

    public login(userType: string) {
        this.user = {
            userType: UserType.GUEST,
        };

        if (userType === "guest") {
            return Observable.create(observable => {
                observable.next(this.user)
            });
        }

        return super.login(userType);
    }

    public getUser() {
        return this.user;
    }

    public setUser(user){
        this.user = user;
    }
}
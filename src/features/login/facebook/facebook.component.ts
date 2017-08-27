import {Component, NgZone} from "@angular/core";
import {Router} from "@angular/router";

import {LocationAuthService} from "../../../shared/services";
import {UserType} from "../../../shared/model/user-type";

@Component({
    selector: 'fb',
    templateUrl: './facebook.component.html',
})
export class FacebookComponent {
    constructor(private _ngZone: NgZone, private _router: Router, private _authService: LocationAuthService) {
        window['fb'] = this;
        window['zone'] = _ngZone;
    }

    public login(response) {
        const user = this._authService.getUser();
        this._authService.login("facebook").subscribe(data => {
               user.name = data.name;
               user.profileImage = data.image;
            }
        );
        user.userType = UserType.FACEBOOK;
        if (response.length > 0) {
            user.accessToken = response[0].authResponse.accessToken;
            this._authService.setUser(user);
            this._router.navigate(["/search"]);
        } else {
            alert("Something went wrong while using facebook. Please refresh and try again!!!");
        }
    }
}
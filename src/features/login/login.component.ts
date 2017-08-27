import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {LocationAuthService} from "../../shared/services";


@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    constructor(private _router: Router, private _authService: LocationAuthService) {

    }

    public login(): void {
        this._authService.login("guest").subscribe(data => {
            this._router.navigate(["/search"])
        })
    }
}
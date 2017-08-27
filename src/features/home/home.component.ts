import {Component} from "@angular/core";
import {LocationAuthService} from "../../shared/services";
import {IUser} from "../../shared/model";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    public user: IUser;

    constructor(private _authService: LocationAuthService) {
        this.user = _authService.getUser();
    }
}
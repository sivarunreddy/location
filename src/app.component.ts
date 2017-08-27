import {Component} from "@angular/core";
import {GeoLocationService} from "./shared/services/geo-location.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(private _geoLocationService: GeoLocationService) {
    }
}

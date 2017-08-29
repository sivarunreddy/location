import {Injectable} from "@angular/core";

import {IGeoLocation} from "../model";
import {HttpClient} from "../http/http-client";
import {ConfigService} from "./config.service";

@Injectable()
export class GeoLocationService {
    private _geoLocation: IGeoLocation;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService) {
        this.init();
    }

    init(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.getHTMLGeoLocation(position);
            }, () => {
                this.getIPGeoLocation();
            });
        }
    }

    public getGeoLocation(): IGeoLocation {
        return this._geoLocation;
    }

    private getHTMLGeoLocation(position: any): void {
        const {latitude, longitude} = position.coords;
        this._geoLocation = {latitude, longitude};
    }

    private getIPGeoLocation(): void {
        this._httpClient.get(this._configService.getGeoURL())
            .map(response => response.json())
            .subscribe(response => {
                this._geoLocation = response;
            });
    }
}
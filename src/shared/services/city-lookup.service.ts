import {Injectable} from "@angular/core";
import {CityInfo} from "../../config/city-info";
import {ConfigService} from "./config.service";
import {HttpClient} from "../http/http-client";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CityLookup {
    private cityInfo: typeof CityInfo = CityInfo;

    public suggestions = [];

    constructor(private _configService: ConfigService, private _httpClient: HttpClient) {
    }

    public lookup(value: string = ""): Observable<any> {
        return this._httpClient.get(this._configService.getTyepAheadURL(), {q: value});
    }

    getCity(cityId) {
        return this.cityInfo.find(city => city.destination_id === cityId);
    }
}
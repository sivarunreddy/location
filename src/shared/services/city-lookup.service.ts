import {Injectable} from "@angular/core";
import {ConfigService} from "./config.service";
import {HttpClient} from "../http/http-client";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CityLookup {

    public suggestions = [];

    constructor(private _configService: ConfigService, private _httpClient: HttpClient) {
    }

    public lookup(value: string = ""): Observable<any> {
        return this._httpClient.get(this._configService.getTyepAheadURL(), {q: value});
    }
}
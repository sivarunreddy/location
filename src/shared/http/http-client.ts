import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpClient {
    constructor(private _http: Http) {
    }

    get(url: string, params?: {[key: string]: any}) {
        return this._http.get(url, {params});
    }

    post(url: string, data: any) {
        return this._http.post(url, data).map(response => response.json());
    }
}
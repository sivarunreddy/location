import {Injectable} from "@angular/core";
import {ISearch} from "../model";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "../http/http-client";
import {ConfigService} from "./config.service";

@Injectable()
export class SearchService {
    private _request: ISearch;
    private _results;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService) {

    }

    public search(search: ISearch): Observable<any> {
        this._request = search;
        const observable = this._httpClient.post(this._configService.getSearchURL(), search);

        /*observable.subscribe(result => {
         this._results = result ;
         if (result && result.UserContext) {
         this._results.userContext = SearchTransformer.toUserContext(result.UserContext);
         }
         });*/

        return observable;
    }

    public getSearch(): ISearch {
        return this._request;
    }

    public getSearchResult(): any {
        return this._results;
    }

    setResult(searchResults: any) {
        this._results = searchResults;
    }
}
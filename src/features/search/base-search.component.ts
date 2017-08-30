import {Router} from "@angular/router";

import * as moment from "moment";

import {CityLookup, GeoLocationService, LocationAuthService, SearchService} from "../../shared/services";
import {ISearchView} from "./search-view";
import {SearchTransformer} from "./transform/search-transformer";
import {Component} from "@angular/core";

@Component({})
export abstract class BaseSearchComponent {
    private FORMAT = "YYYY-MM-DD";
    public isSearchInProgress = false;
    public message: {
        id?: string,
        type: string,
        text: string,
    };
    public searchView: ISearchView = {
        destination: "",
        from: moment().format(this.FORMAT),
        to: moment().format(this.FORMAT),
        adults: 1,
        children: 0,
        rooms: 1,
    };
    public suggestCities: any = [];

    constructor(protected _router: Router,
                protected _searchService: SearchService,
                protected _geoLocationService: GeoLocationService,
                protected _authService: LocationAuthService,
                protected _cityLookup: CityLookup) {

    }

    public cityLookup() {
        this.searchView.destination_id = undefined;
        this._cityLookup.lookup(this.searchView.destination).subscribe(result => {
            this.suggestCities = result.json() || [];
        }, () => {
            this.suggestCities = [];
        });
    }

    public selectSuggestion(city) {
        this.searchView.destination = `${city.city}, ${city.region}`;
        this.searchView.destination_id = city.destination_id;
        this.suggestCities = [];
    }

    public search(): void {
        this.message = undefined;
        const params = {
            view: this.searchView,
            geoLocation: this._geoLocationService.getGeoLocation(),
            user: this._authService.getUser(),
        };
        if (!this.searchView.destination_id) {
            this.message = {
                id: "destination_id",
                type: "INPUT_VALIDATION",
                text: "Invalid destination id",
            };
            return;
        }
        this.isSearchInProgress = true;
        this.searchCleanUP();
        this._searchService.search(SearchTransformer.toModel(params)).subscribe(result => {
                this.isSearchInProgress = false;
                const searchResults = result;
                if (result && result.UserContext) {
                    searchResults.userContext = SearchTransformer.toUserContext(result.UserContext);
                }
                this._searchService.setResult(searchResults);
                this.catchSearchData();
            },
            (error) => {
                this.isSearchInProgress = false;
                this.message = {
                    type: "SERVICE",
                    text: "Unable to fetch the search results",
                };
                console.log(error);
            }
        );
    }

    public searchCleanUP() {

    }

    abstract catchSearchData(): void ;

}
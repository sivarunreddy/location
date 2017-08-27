import {Router} from "@angular/router";

import * as moment from "moment";

import {CityLookup, GeoLocationService, LocationAuthService, SearchService} from "../../shared/services";
import {ISearchView} from "./search-view";
import {SearchTransformer} from "./transform/search-transformer";
import {Component} from "@angular/core";

@Component({
})
export abstract class BaseSearchComponent {

    private FORMAT = "YYYY-MM-DD";
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
        this.suggestCities = this._cityLookup.lookup(this.searchView.destination)
    }

    public selectSuggestion(city) {
        this.searchView.destination = `${city.city}, ${city.region}`;
        this.searchView.destination_id = city.destination_id;
        this.suggestCities = [];
    }

    public search(): void {
        const params = {
            view: this.searchView,
            geoLocation: this._geoLocationService.getGeoLocation(),
            user: this._authService.getUser(),
        };

        this._searchService.search(SearchTransformer.toModel(params)).subscribe(() => {
                this.catchSearchData();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    abstract catchSearchData(): void ;

}
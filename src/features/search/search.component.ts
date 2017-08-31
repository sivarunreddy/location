import {Component} from "@angular/core";

import {SearchService} from "../../shared/services";
import {GeoLocationService} from "../../shared/services/geo-location.service";
import {SearchTransformer} from "./transform/search-transformer";

@Component({
    templateUrl: "./search.component.html",
})
export class SearchComponent {
    public searchResult: any;
    public parent = this;
    public geoLocation;

    constructor(private _searchService: SearchService,
                private _geoLocationService: GeoLocationService) {
    }

    public searchCleanUP() {
        this.searchResult = undefined;
    }

    public catchSearchData() {
        this.searchResult = this._searchService.getSearchResult();
        this.geoLocation = SearchTransformer.getGeoLocations(this.searchResult.GeoCoordinateContext);
    }
}
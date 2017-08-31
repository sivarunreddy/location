import {Component} from "@angular/core";

import {SearchService} from "../../shared/services";
import {IGeoLocation} from "../../shared/model/geo-location";
import {GeoLocationService} from "../../shared/services/geo-location.service";

@Component({
    templateUrl: "./search.component.html",
})
export class SearchComponent {
    public searchResult: any;
    public parent = this;
    public geoLocation: {
        from: IGeoLocation,
    };

    constructor(private _searchService: SearchService,
                private _geoLocationService: GeoLocationService) {
    }

    public searchCleanUP() {
        this.searchResult = undefined;
    }

    public catchSearchData() {
        this.searchResult = this._searchService.getSearchResult();
        this.geoLocation = {
            from : this._geoLocationService.getGeoLocation()
        };
        this.geoLocation.from.label = "A";
    }
}
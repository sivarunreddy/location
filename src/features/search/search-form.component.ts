import {Router} from "@angular/router";

import * as moment from "moment";

import {CityLookup, GeoLocationService, LocationAuthService, SearchService} from "../../shared/services";
import {ISearchView} from "./search-view";
import {SearchTransformer} from "./transform/search-transformer";
import {Component, Input} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "search-form",
    templateUrl: "./search-form.component.html",
})
export class SearchFormComponent {
    @Input() parentComponent?;
    @Input() cleanUp;
    private FORMAT = "YYYY-MM-DD";
    public isSearchInProgress = false;
    public isTypeAheadInProgress = false;
    public message: {
        id?: string,
        type: string,
        text: string,
    };
    public searchView: ISearchView = {
        destination: "",
        from: moment().format(this.FORMAT),
        to: moment().format(this.FORMAT),
        rooms: [{
            adults: 1,
            children: 0,
        }],
    };
    public roomCount = 1;
    public suggestCities: any = [];

    searchChangeObserver;

    constructor(protected _router: Router,
                protected _searchService: SearchService,
                protected _geoLocationService: GeoLocationService,
                protected _authService: LocationAuthService,
                protected _cityLookup: CityLookup) {

    }

    public cityLookup() {
        if (!this.searchChangeObserver) {
            Observable.create(observer => {
                this.searchChangeObserver = observer;
            }).debounceTime(500) // wait 300ms after the last event before emitting last event
                .distinctUntilChanged() // only emit if value is different from previous value
                .subscribe(() => {
                    this.searchView.destination_id = undefined;
                    if (!this.searchView.destination || (this.searchView.destination && this.searchView.destination.trim().length === 0)) {
                        this.suggestCities = [];
                        return;
                    }
                    this.isTypeAheadInProgress = true;
                    this._cityLookup.lookup(this.searchView.destination).subscribe(result => {
                        this.isTypeAheadInProgress = false;
                        this.suggestCities = result.json() || [];
                    }, () => {
                        this.isTypeAheadInProgress = false;
                        this.suggestCities = [];
                    });
                });
        }
        if (this.searchView.destination && this.searchView.destination.trim().length > 0) {
            this.searchChangeObserver.next(this.searchView.destination);
        } else {
            this.suggestCities = [];
        }
    }

    public selectSuggestion(city) {
        this.searchView.destination = city.value;
        this.searchView.destination_id = city.id;
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
        if (this.cleanUp) {
            this.parentComponent.searchCleanUP();
        }
        this._searchService.search(SearchTransformer.toModel(params)).subscribe(result => {
                this.isSearchInProgress = false;
                const searchResults = result;
                if (result && result.UserContext) {
                    searchResults.userContext = SearchTransformer.toUserContext(result.UserContext);
                }
                this._searchService.setResult(searchResults);
                this.parentComponent.catchSearchData();
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

    public updateRooms(): void {
        const actualCount = this.searchView.rooms.length;
        if (actualCount > this.roomCount) {
            this.searchView.rooms.length = this.roomCount;
        } else {
            this.searchView.rooms.push({
                adults: 1,
                children: 0,
            });
        }
    }
}
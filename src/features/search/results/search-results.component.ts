import {Component, OnInit} from "@angular/core";
import {ISearchView} from "../search-view";
import {SearchTransformer} from "../transform/search-transformer";
import {ISearch} from "../../../shared/model";
import {BaseSearchComponent} from "../base-search.component";

@Component({
    templateUrl: './search-results.component.html',
})
export class SearchResults extends BaseSearchComponent implements OnInit {
    public searchView: ISearchView;
    public searchResult: any;

    ngOnInit(): void {
        const searchRequest: ISearch = this._searchService.getSearch();
        if (searchRequest) {
            this.searchView = SearchTransformer.toView(this._searchService.getSearch());
            const city = this._cityLookup.getCity(this.searchView.destination_id);
            if(city){
                this.searchView.destination = `${city.city}, ${city.country_code}`;
            }

            this.searchResult = this._searchService.getSearchResult();
            this.addUserContext();
        }
    }

    public catchSearchData() {
        this.searchResult = this._searchService.getSearchResult();
        this.addUserContext();
    }

    private addUserContext(){
        this.searchResult.userContext = SearchTransformer.toUserContext(this.searchResult.UserContext);
    }
}
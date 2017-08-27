import {Component} from "@angular/core";
import {BaseSearchComponent} from "./base-search.component";

@Component({
    templateUrl: './search.component.html',
})
export class SearchComponent extends BaseSearchComponent {

    public catchSearchData() {
        this._router.navigate(["/search-results"]);
    }
}
import {Component} from "@angular/core";

import {BaseContextComponent} from "../base-context.component";

@Component({
    selector: "search-context",
    templateUrl: "./search-context.component.html",
})
export class SearchContextComponent extends BaseContextComponent {

    public TRIP_MAPPING = {
        BUSINESS_TRIP: {
            title: "Business trip",
            logo: {
                name: "work",
                color: "w3-text-light-blue",
            }
        },
        WEEKEND_GETAWAY_ADULTS: {
            title: "Weekend trip",
            logo: {
                name: "beach_access",
                color: "w3-text-blue",
            }
        },
        VACATION_NUCLEAR_FAMILY: {
            title: "Family trip",
            logo: {
                name: "golf_course",
                color: "w3-text-light-green",
            }
        },
    };

    getTripLogo(type) {
        if (type.startsWith("BUSINESS")) {
            return "work";
        } else if (type === "WEEKEND_GETAWAY_ADULTS") {
            return "motorcycle";
        } else if (type.startsWith("WEEKEND")) {
            return "beach_access";
        } else if (type.startsWith("VACATION")) {
            return "golf_course";
        }
    }
}

import {Component} from "@angular/core";

import {BaseContextComponent} from "../base-context.component";

@Component({
    selector: "travel-context",
    templateUrl: "./travel-context.component.html",
})
export class TravelContextComponent extends BaseContextComponent {
    public TRAVEL_MODS_MAPPING = {
        AIR: {
            logo: "flight_takeoff",
            title: "Air",
        },
        RAIL: {
            logo: "directions_railway",
            title: "Train",
        },
        ROAD: {
            logo: "directions_bus",
            title: "Road"
        }
    }

    public getTime(travelContext) {
        if (travelContext.feasibility === "INFEASIBLE") {
            return "-";
        } else {
            return `${~~(travelContext.timeDistance.time / 3600)} Hours`;
        }
    }

    public getDistance(travelContext) {
        if (travelContext.feasibility === "INFEASIBLE") {
            return "-";
        } else {
            return `${~~(travelContext.timeDistance.distance / 1000)} KM`;
        }

    }
}
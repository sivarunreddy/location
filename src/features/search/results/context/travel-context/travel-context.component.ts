import {Component} from "@angular/core";

import {BaseContextComponent} from "../base-context.component";

@Component({
    selector: "travel-context",
    templateUrl: './travel-context.component.html',
})
export class TravelContextComponent extends BaseContextComponent {
    public TRAVEL_MODS_MAPPING = {
        AIR: {
            logo: "flight_takeoff",
            title: "Air",
        },
        ROAD: {
            logo: "directions_railway",
            title: "Train",
        },
        RAIL: {
            logo: "directions_bus",
            title: "Road"
        }
    }

    public getTime(time) {
        return `${~~(time / 3600)}h ${~~((time % 3600) / 60)}m  ${time % 60}s`
    }
}
import {Component} from "@angular/core";

import {CloudData} from "angular-tag-cloud-module";

import {BaseContextComponent} from "../base-context.component";

@Component({
    selector: "user-context",
    templateUrl: "./user-context.component.html",
})
export class UserContextComponent extends BaseContextComponent {

    data: Array<CloudData> = [];

    getCloudData(theams = []) {
        this.data.length = 0;
        theams.forEach(theam => {
            this.data.push({text: `${theam.type}(${theam.count})`, weight: theam.count});
        });
        return this.data;
    }
}
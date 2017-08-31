import {Input} from "@angular/core";

export class BaseContextComponent {
    @Input() contextData;

    getTitle(actual) {
        return actual.replace(/_/g, " ");
    }
}
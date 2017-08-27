import {Injectable} from "@angular/core";

import {config} from "../../config/config";
@Injectable()
export class ConfigService {
    public getGeoURL():string {
        return config.geoAPI;
    };

    getSearchURL():string {
        return config.searchAPI;
    }
}
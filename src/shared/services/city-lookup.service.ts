import {Injectable} from "@angular/core";
import {CityInfo} from "../../config/city-info";

@Injectable()
export class CityLookup {
    private cityInfo: typeof CityInfo = CityInfo;

    public lookup(value: string = "") {
        if (value.length == 0) return [];
        const result = this.cityInfo.filter(city => (city.city.match(new RegExp(value, "ig")) || []).length > 0);
        return (result || []).length > 0 ? result : [];
    }

    getCity(cityId) {
        return this.cityInfo.find(city => city.destination_id === cityId);
    }
}
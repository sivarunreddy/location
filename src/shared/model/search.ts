import {IRoom} from "./Room";
import {IDate} from "./Date";
import {IGeoLocation} from "./geo-location";
export interface ISearch {
    destinationId: string;
    /*fromDate: IDate;
    toDate: IDate;*/
    fromDate: string,
    toDate: string,
    rooms: Array<IRoom>;
    user: {
        geoCoordinate?: IGeoLocation;
        accessToken?: string
    }
}
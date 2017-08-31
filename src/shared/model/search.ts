import {IRoom} from "./Room";
import {IGeoLocation} from "./geo-location";
export interface ISearch {
    destination: string;
    destinationId: string;
    /*fromDate: IDate;
     toDate: IDate;*/
    fromDate: string;
    toDate: string;
    rooms: Array<IRoom>;
    user: {
        geoCoordinate?: IGeoLocation;
        accessToken?: string
    };
}
import {IRoom} from "../../shared/model/Room";
export interface ISearchView {
    destination: string;
    destination_id?: number;
    from: string;
    to: string;
    rooms: Array<IRoom>;
}
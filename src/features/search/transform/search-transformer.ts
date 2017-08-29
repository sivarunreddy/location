import * as moment from "moment";

import {ISearch, UserContext} from "../../../shared/model";
import {ISearchView} from "../search-view";

export class SearchTransformer {
    static toModel({view, geoLocation, user}): ISearch {
        const from = moment(view.from);
        const to = moment(view.to);
        return {
            destinationId: Number(view.destination_id).toString(),
            fromDate: from.format("YYYY-MM-DD"),
            toDate: to.format("YYYY-MM-DD"),
            rooms: SearchTransformer.getRooms(view),
            user: {
                accessToken: user.accessToken,
                geoCoordinate: {
                    latitude: geoLocation.latitude,
                    longitude: geoLocation.longitude,
                },
            },
        };
    }

    public static toView(search: ISearch): ISearchView {
        return {
            destination: "",
            destination_id: parseInt(search.destinationId, 10),
            /*from: `${search.fromDate.year}-${SearchTransformer.getZeroPad(search.fromDate.month)}-${SearchTransformer.getZeroPad(search.fromDate.day)}`,
             to: `${search.toDate.year}-${SearchTransformer.getZeroPad(search.toDate.month)}-${SearchTransformer.getZeroPad(search.toDate.day)}`,*/
            from: search.fromDate,
            to: search.toDate,
            rooms: search.rooms.length,
            adults: search.rooms.length > 0 ? search.rooms[0].adults : 1,
            children: search.rooms.length > 0 ? search.rooms[0].children : 0,
        };
    }

    public static toUserContext(userContextResult = []): UserContext {
        let userContext: UserContext = {};

        userContextResult.forEach(result => {
            if (result.contextType === "CountriesVisited") {
                const countries = result.data || {};
                userContext.countriesVisited = [];
                Object.keys(countries).forEach(key => {
                    userContext.countriesVisited.push({
                        name: key,
                        count: countries[key],
                    });
                });
            } else if (result.contextType === "ThemesPopular") {
                const theams = result.data || {};
                userContext.themesPopular = [];
                Object.keys(theams).forEach(key => {
                    userContext.themesPopular.push({
                        type: key,
                        count: theams[key],
                    });
                });
            }
        });

        return userContext;
    }

    private static getZeroPad(value) {
        return (`0${value}`).slice(-2);
    }

    private static getRooms({adults, children, rooms}) {
        const roomsObj = [];
        for (let i = 0; i < rooms; i++) {
            roomsObj.push({
                adults,
                children,
            })
        }
        return roomsObj;
    }
}
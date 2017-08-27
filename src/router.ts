import {LoginComponent, SearchComponent, SearchResults} from "./features";
export const Router = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "search",
        component: SearchComponent
    },
    {
        path: "search-results",
        component: SearchResults
    },

];
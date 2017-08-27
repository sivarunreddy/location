import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MomentModule} from "angular2-moment";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {Angular2SocialLoginModule} from "angular2-social-login";
import { TagCloudModule } from 'angular-tag-cloud-module';

import {Router} from "./router";
import {AppComponent} from "./app.component";
import {FacebookComponent, HomeComponent, LoginComponent, SearchComponent, SearchResults} from "./features";
import {GeoLocationService, SearchService, LocationAuthService, CityLookup, ConfigService} from "./shared/services";
import {HttpClient} from "./shared/http/http-client";
import {TravelContextComponent, SearchContextComponent,UserContextComponent} from "./features/search/results/context";
import {config} from "../src/config/config";

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        BrowserModule,
        NgbModule.forRoot(),
        MomentModule,
        RouterModule.forRoot(Router),
        Angular2SocialLoginModule,
        TagCloudModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        FacebookComponent,
        SearchComponent,
        SearchResults,
        TravelContextComponent,
        SearchContextComponent,
        UserContextComponent,
    ],
    providers: [
        GeoLocationService,
        SearchService,
        HttpClient,
        LocationAuthService,
        CityLookup,
        ConfigService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

Angular2SocialLoginModule.loadProvidersScripts({
    facebook: {
        clientId: config.fbClientId,
        apiVersion: "v2.4",
    }
});
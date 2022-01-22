import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {AlbumComponent} from './components/album/album.component';
import {HomeComponent} from './components/home/home.component';
import {PlayerComponent} from './components/player/player.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SearchComponent} from './components/search/search.component';
import {ContentComponent} from './components/content/content.component';
import {LogoutComponent} from './components/logout/logout.component';
import { ChronoPipe } from './pipes/chrono.pipe';
import { TrackListComponent } from './components/track-list/track-list.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        AlbumComponent,
        HomeComponent,
        PlayerComponent,
        SidebarComponent,
        NavbarComponent,
        SearchComponent,
        ContentComponent,
        LogoutComponent,
        ChronoPipe,
        TrackListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

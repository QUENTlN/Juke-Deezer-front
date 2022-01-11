import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {AlbumComponent} from './components/album/album.component';
import {HomeComponent} from './components/home/home.component';
import {PlayerComponent} from './player/player.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        AlbumComponent,
        HomeComponent,
        PlayerComponent
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

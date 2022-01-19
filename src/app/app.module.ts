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
import { SearchComponent } from './components/search/search.component';
import { ContentComponent } from './components/content/content.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AlbumChartComponent } from './components/albumChart/albumChart.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadiosComponent } from './components/radios/radios.component';
import { GenresComponent } from './components/genres/genres.component';
import {MusiqueComponent} from "./components/musique/musique.component";
import { PodcastsComponent } from './components/podcasts/podcasts.component';
import { TracksComponent } from './components/tracks/tracks.component';



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
        AlbumChartComponent,
        RadiosComponent,
        GenresComponent,
        MusiqueComponent,
        PodcastsComponent,
        TracksComponent,


    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        MatCardModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent],

})
export class AppModule {
}

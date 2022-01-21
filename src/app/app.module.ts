import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationComponent} from './components/authentication/authentication.component'
import {HomeComponent} from './components/home/home.component';
import {PlayerComponent} from './components/player/player.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { ContentComponent } from './components/content/content.component';
import { LogoutComponent } from './components/logout/logout.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadiosComponent } from './components/radios/radios.component';
import { GenresComponent } from './components/genres/genres.component';
import {MusiqueComponent} from "./components/musique/musique.component";
import { PodcastsComponent } from './components/podcasts/podcasts.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { ArtistAlbumsComponent } from './components/artist-albums/artist-albums.component';




@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HomeComponent,
        PlayerComponent,
        SidebarComponent,
        NavbarComponent,
        SearchComponent,
        ContentComponent,
        LogoutComponent,
        RadiosComponent,
        GenresComponent,
        MusiqueComponent,
        PodcastsComponent,
        ArtistComponent,
        AlbumDetailsComponent,
        ArtistDetailsComponent,
        AlbumsListComponent,
        ArtistAlbumsComponent,




    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatButtonToggleModule
    ],
    providers: [],
    bootstrap: [AppComponent],

})
export class AppModule {
}

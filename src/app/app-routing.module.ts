import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {HomeComponent} from "./components/home/home.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {RadiosComponent} from "./components/radios/radios.component";
import {MusiqueComponent} from "./components/musique/musique.component";
import {AlbumDetailsComponent} from "./components/album-details/album-details.component";
import {ArtistDetailsComponent} from "./components/artist-details/artist-details.component";
import {DecouvrirComponent} from "./components/decouvrir/decouvrir.component";
import {GenreDetailsComponent} from "./components/genre-details/genre-details.component";
import {TrackListComponent} from "./components/track-list/track-list.component";
import {SearchResultsComponent} from "./components/search-results/search-results.component";
import {FavoriteTracksComponent} from "./components/favorite-tracks/favorite-tracks.component";
import {PlaylistsComponent} from "./components/playlists/playlists.component";
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {FavoriteAlbumsComponent} from "./components/favorite-albums/favorite-albums.component";
import {FavoriteArtistComponent} from "./components/favorite-artist/favorite-artist.component";
import {OptionComponent} from "./components/option/option.component";
import {RadioDetailsComponent} from "./components/radio-details/radio-details.component";
import {ProfilComponent} from "./components/profil/profil.component";

const routes: Routes = [
    {path: 'auth', component: AuthenticationComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'track-list', component: TrackListComponent},
    {path: 'radios', component: RadiosComponent},
    {path: 'musique', component: MusiqueComponent},
    {path: 'album-details/:id', component: AlbumDetailsComponent},
    {path: 'artist-details/:id', component: ArtistDetailsComponent},
    {path: 'genre-details/:id', component: GenreDetailsComponent},
    {path: 'radio-details/:id', component: RadioDetailsComponent},
    {path: 'search/:name', component: SearchResultsComponent},
    {path: 'decouvrir', component: DecouvrirComponent},
    {path: 'option', component: OptionComponent},
    {path: 'favorite-tracks', component: FavoriteTracksComponent},
    {path: 'favorite-albums', component: FavoriteAlbumsComponent},
    {path: 'favorite-artists', component: FavoriteArtistComponent},
    {path: 'playlists', component: PlaylistsComponent},
    {path: 'playlist/:id', component: PlaylistComponent},
    {path: 'profil', component:ProfilComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

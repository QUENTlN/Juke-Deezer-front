import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {HomeComponent} from "./components/home/home.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {RadiosComponent} from "./components/radios/radios.component";
import {MusiqueComponent} from "./components/musique/musique.component";
import {PodcastsComponent} from "./components/podcasts/podcasts.component";
import {AlbumDetailsComponent} from "./components/album-details/album-details.component";
import {ArtistDetailsComponent} from "./components/artist-details/artist-details.component";
import {DecouvrirComponent} from "./components/decouvrir/decouvrir.component";
import {GenreDetailsComponent} from "./components/genre-details/genre-details.component";

const routes: Routes = [
    {path: 'auth', component: AuthenticationComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'radios', component: RadiosComponent},
    {path: 'musique', component: MusiqueComponent},
    {path: 'podcasts', component: PodcastsComponent},
    {path: 'album-details/:id', component: AlbumDetailsComponent},
    {path: 'artist-details/:id', component: ArtistDetailsComponent},
    {path: 'genre-details/:id', component: GenreDetailsComponent},
    {path: 'decouvrir', component: DecouvrirComponent},
    {path: '', component: HomeComponent},
    {path: '**', component: HomeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

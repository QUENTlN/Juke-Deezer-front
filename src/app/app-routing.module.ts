import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {AlbumComponent} from "./components/album/album.component";
import {HomeComponent} from "./components/home/home.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {TrackListComponent} from "./components/track-list/track-list.component";

const routes: Routes = [
    {path: 'auth', component: AuthenticationComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'album', component: AlbumComponent},
    {path: 'track-list', component: TrackListComponent},
    {path: '**', component: HomeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

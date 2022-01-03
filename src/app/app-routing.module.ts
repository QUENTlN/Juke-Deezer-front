import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {AlbumComponent} from "./components/album/album.component";

const routes: Routes = [
    { path: 'auth', component: AuthenticationComponent },
    { path: 'album', component: AlbumComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

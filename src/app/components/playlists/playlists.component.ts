import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {PlaylistList} from "../../models/playlist-list.model";
import {firstValueFrom} from "rxjs";
import {Playlist} from "../../models/playlist.model";

@Component({
    selector: 'app-playlists',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

    playlists: Playlist[] = [];

    constructor(private deezerService: DeezerService) {
    }

    async ngOnInit() {
        this.playlists = (await firstValueFrom(this.deezerService.getPlaylistsByUser())).data;
    }

}

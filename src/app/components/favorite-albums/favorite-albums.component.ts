import {Component, OnInit} from '@angular/core';
import {Album} from "../../models/album.model";
import {firstValueFrom} from "rxjs";
import {PlayerService} from "../../services/player.service";
import {DeezerService} from "../../services/deezer.service";

class AlbumService {
}

@Component({
    selector: 'app-favorite-albums',
    templateUrl: './favorite-albums.component.html',
    styleUrls: ['./favorite-albums.component.scss']
})
export class FavoriteAlbumsComponent implements OnInit {

    albums: Album[] = [];

    constructor(private deezerService: DeezerService, private playerService: PlayerService) {
    }

    async ngOnInit() {
        if (this.playerService.favoriteAlbums.length === 0) {
            this.playerService.favoriteAlbums = (await firstValueFrom(this.deezerService.getFavoriteAlbums())).data;

        }
        this.albums = this.playerService.favoriteAlbums;
    }

}

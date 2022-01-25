import {Component, OnInit} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {Artist} from "../../models/artist.model";
import {DeezerService} from "../../services/deezer.service";
import {PlayerService} from "../../services/player.service";

@Component({
    selector: 'app-favorite-artist',
    templateUrl: './favorite-artist.component.html',
    styleUrls: ['./favorite-artist.component.scss']
})
export class FavoriteArtistComponent implements OnInit {

    artists: Artist[] = [];

    constructor(private deezerService: DeezerService, private playerService: PlayerService) {
    }

    async ngOnInit() {
        if (this.playerService.favoriteArtists.length === 0) {
            this.playerService.favoriteArtists = (await firstValueFrom(this.deezerService.getFavoriteArtists())).data;

        }
        this.artists = this.playerService.favoriteArtists;
    }

}

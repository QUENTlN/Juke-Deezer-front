import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeezerService} from "../../services/deezer.service";
import {Album} from "../../models/album.model";
import {faPlayCircle, faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {firstValueFrom} from "rxjs";
import {PlayerService} from "../../services/player.service";

@Component({
    selector: 'app-artist-albums',
    templateUrl: './artist-albums.component.html',
    styleUrls: ['./artist-albums.component.scss']
})
export class ArtistAlbumsComponent implements OnInit, OnChanges {

    faSquareFull = faSquareFull;
    faPlayCircle = faPlayCircle;
    @Input() idArtist: number | undefined;
    albumsOfArtist: Album[] | undefined;
    album: Album | undefined;

    constructor(
        private deezerService: DeezerService,
        private _activatedRoute: ActivatedRoute,
        private playerService: PlayerService
    ) {
        this._activatedRoute.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }

    ngOnInit(): void {
        if (this.idArtist == undefined) {
            if (history.state?.artist?.id != null) {
                this.idArtist = history.state?.artist?.id;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.idArtist != undefined) {
            this.deezerService.getArtistAlbums(this.idArtist)
                .subscribe((data) => {
                        this.albumsOfArtist = data.data;

                    }
                );
        }
    }

    click(album: Album | undefined) {
        this.album = album
    }

    async playAlbum(album: Album) {
        this.playerService.setAlbum(await firstValueFrom(this.deezerService.getAlbum(album.id)));
        this.playerService.jumpTo(0);
    }

}

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DeezerService} from "../../services/deezer.service";
import {Album} from "../../models/album.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss']
})
export class ArtistAlbumsComponent implements OnInit {
    faPlayCircle=faPlayCircle;
    @Input()idArtist:number|undefined;
    albumsOfArtist:Album[]|undefined;
    album:Album|undefined;

    constructor(
        private deezerService:DeezerService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }

    ngOnInit(): void {
        if (history.state?.artist?.id != null)
            this.idArtist=history.state?.artist?.id;
        else
            this.idArtist=history.state?.id;

        this.deezerService.getArtistAlbums(this.idArtist)
            .subscribe((data) => {
                    this.albumsOfArtist = data.data;

                }
            )

    }
    click(album: Album | undefined) {
        this.album = album
    }

}

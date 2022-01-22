import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {Album} from "../../models/album.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Artist} from "../../models/artist.model";
import {faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
import {firstValueFrom} from "rxjs";
import {PlayerService} from "../../services/player.service";
import {Track} from "../../models/track.model";


@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})

export class AlbumDetailsComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    fasHeart=fasHeart;
    farHeart=farHeart;
    albumDetails: Album | undefined;
    idArtist: number | undefined;
    idAlbum:number|undefined;
    artist: Artist|undefined;

    constructor(
        private deezerService: DeezerService,
        private playerService: PlayerService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }

    ngOnInit(): void {
        console.log(history.state)

        if (history.state?.artist?.id != null) {
            this.idArtist = history.state?.artist?.id;
            this.idAlbum = history.state?.id;
            if (this.idAlbum != null) {
                this.deezerService.getAlbum(this.idAlbum)
                    .subscribe((data) => {
                            this.albumDetails = data
                            console.log(this.idArtist);

                        }
                    );
            }

        } else {

            this.idAlbum=history.state?.id;
            console.log(this.idAlbum);
            if (this.idAlbum != null){
                this.deezerService.getAlbum(this.idAlbum)
                    .subscribe((data) => {
                            this.albumDetails = data
                            this.idArtist=data?.artist?.id

                            console.log(this.idArtist);

                        }
                    );
            }
        }


    }


    async favorite(track: Track) {
        this.playerService.favoriteTracks.push(track);
        await firstValueFrom(this.deezerService.addToFavorite(track.id));
    }

    async unfavorite(track: Track) {
        this.playerService.favoriteTracks = this.playerService.favoriteTracks.filter(track1 => track1.id != track.id);
        await firstValueFrom(this.deezerService.removeFromFavorite(track.id));
    }

    isTrackFavorite(track: Track) {
        return this.playerService.favoriteTracks.find(track1 => track1.id == track.id) != null;
    }
}




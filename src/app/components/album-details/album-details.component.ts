import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {Album} from "../../models/album.model";
import {ActivatedRoute} from '@angular/router';
import {Artist} from "../../models/artist.model";
import {faEllipsisH, faPlay, faPlayCircle, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
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

    faEllipsisH = faEllipsisH
    faPlay = faPlay;
    faPlayCircle = faPlayCircle;
    fasHeart = fasHeart;
    farHeart = farHeart;
    albumDetails: Album | undefined;
    idArtist: number | undefined;
    idAlbum: number | undefined;
    artist: Artist | undefined;

    trackToAdd: Track[] = [];
    listCheck: {id: number, checked: boolean }[] = [];

    constructor(
        private deezerService: DeezerService,
        private playerService: PlayerService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }

    async ngOnInit() {
        console.log(history.state)

        if (history.state?.artist?.id != null) {
            this.idArtist = history.state?.artist?.id;
            this.idAlbum = history.state?.id;
            if (this.idAlbum != null) {
                this.albumDetails = await firstValueFrom(this.deezerService.getAlbum(this.idAlbum))
                // this.albumDetails.tracks.data.forEach(async track => {
                //     track.contributors = (await firstValueFrom(this.deezerService.getTrack(track.id))).contributors
                // }); TODO: readd it
            }

        } else {

            this.idAlbum = history.state?.id;
            console.log(this.idAlbum);
            if (this.idAlbum != null) {
                this.deezerService.getAlbum(this.idAlbum)
                    .subscribe((data) => {
                            this.albumDetails = data
                            this.idArtist = data?.artist?.id
                        }
                    );
            }
        }

        if (this.playerService.favoriteAlbums == []) {
            this.playerService.favoriteAlbums = (await firstValueFrom(this.deezerService.getFavoriteAlbums())).data;
        }
        this.albumDetails?.tracks.data.forEach(track => {
            this.listCheck.push({'id':track.id, 'checked':false})
        });
    }


    async favorite(track: Track) {
        this.playerService.favoriteTracks.push(track);
        await firstValueFrom(this.deezerService.addToFavorite(track.id));
    }

    async unfavorite(track: Track) {
        this.playerService.favoriteTracks = this.playerService.favoriteTracks.filter(track1 => track1.id != track.id);
        await firstValueFrom(this.deezerService.removeFromFavorite(track.id));
    }

    checkAll() {
        if (this.listCheck.every(check => !check.checked)) {
            this.listCheck.forEach(check => check.checked = true)
            if (this.albumDetails?.tracks.data) {
                this.trackToAdd = [...this.albumDetails?.tracks.data];
            }
        } else {
            this.listCheck.forEach(check => check.checked = false)
            this.trackToAdd = [];
        }
    }

    check(track: Track) {
        this.listCheck.forEach(track1 => {
            if (track1.id == track.id) {
                track1.checked = !track1.checked;
                if (track1.checked) {
                    this.trackToAdd.push(track);
                } else {
                    this.trackToAdd = this.trackToAdd.filter(track1 => track1.id != track.id);
                }
            }
        });
    }

    isChecked(track: Track) {
        return this.listCheck.find(track1 => track1.id == track.id)?.checked;
    }

    isOneChecked() {
        return this.listCheck.some(check => check.checked);
    }

    isTrackFavorite(track: Track) {
        return this.playerService.favoriteTracks.find(track1 => track1.id == track.id) != null;
    }

    play(i: number) {
        if (this.albumDetails != undefined) {
            this.playerService.setAlbum(this.albumDetails);
            this.playerService.jumpTo(i);
        }
    }

    getCurrentTrackId() {
        return this.playerService.getCurrentTrack()?.id;
    }

    setTrack(track: Track) {
        this.trackToAdd = [];
        this.trackToAdd.push(track);
    }

    addTrack(track: Track) {
        this.trackToAdd.push(track);
    }

    isAlbumFavorite(): boolean {
        return this.playerService.favoriteAlbums.find(album => album.id == this.albumDetails?.id) != null;
    }

    async favoriteAlbum() {
        if (this.albumDetails != undefined) {
            this.playerService.favoriteAlbums.push(this.albumDetails);
            await firstValueFrom(this.deezerService.addAlbumToFavorite(this.albumDetails?.id));
        }
    }

    async unfavoriteAlbum() {
        if (this.albumDetails != undefined) {
            this.playerService.favoriteAlbums = this.playerService.favoriteAlbums.filter(album => album.id != this.albumDetails?.id);
            await firstValueFrom(this.deezerService.removeAlbumFromFavorite(this.albumDetails?.id));
        }
    }

    addToFavorites() {
        this.trackToAdd.forEach(track => {
            this.favorite(track).then(data => {
                this.trackToAdd = this.trackToAdd.filter(track1 => track1.id != track.id);
            });
        });
    }
}




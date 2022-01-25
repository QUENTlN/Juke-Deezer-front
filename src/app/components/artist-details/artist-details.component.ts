import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeezerService} from "../../services/deezer.service";
import {Artist} from "../../models/artist.model";
import {TrackList} from "../../models/track-list.model";
import {PlaylistList} from "../../models/playlist-list.model";
import {ArtistList} from "../../models/artist-list.model";
import {faEllipsisH, faPlayCircle, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
import {Track} from "../../models/track.model";
import {firstValueFrom} from "rxjs";
import {PlayerService} from "../../services/player.service";

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html',
    styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {

    faEllipsisH = faEllipsisH;
    faPlayCircle = faPlayCircle;
    fasHeart = fasHeart;
    farHeart = farHeart;
    idArtist: number | undefined;
    artist: Artist | undefined;
    titres: TrackList | undefined;
    playlists: PlaylistList | undefined;
    relatedArtists: ArtistList | undefined;

    trackToAdd: Track[] = [];
    listCheck: { id: number, checked: boolean }[] = [];

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

        if (history.state?.artist?.id != null) {
            this.idArtist = history.state?.artist?.id;
            this.artist = history.state?.artist;

            this.getTitres();
            this.getPlaylist();
            this.getRelatedArtistsList();
        } else {
            this._activatedRoute.params.subscribe(async (params) => {
                this.artist = await firstValueFrom(this.deezerService.getArtist(params['id']));
                this.idArtist = this.artist?.id;
                this.getTitres();
                this.getPlaylist();
                this.getRelatedArtistsList();
            });
        }

        if (this.playerService.favoriteArtists.length == 0) {
            this.playerService.favoriteArtists = (await firstValueFrom(this.deezerService.getFavoriteArtists())).data;
        }
    }

    getTitres() {
        if (this.idArtist != null) {
            this.deezerService.getTopTrackArtist(this.idArtist)
                .subscribe((data) => {
                        this.titres = data;
                        this.listCheck = [];
                        this.titres?.data.forEach(track => {
                            this.listCheck.push({'id': track.id, 'checked': false})
                        });
                    }
                );
        }
    }

    getPlaylist() {
        if (this.idArtist != null) {
            this.deezerService.getArtistPlaylists(this.idArtist)
                .subscribe((data) => {
                        this.playlists = data;
                        console.log(this.playlists)
                    }
                );
        }
    }

    getRelatedArtistsList() {
        if (this.idArtist != null) {
            this.deezerService.getRelatedArtists(this.idArtist)
                .subscribe((data) => {
                        this.relatedArtists = data;
                        console.log(this.playlists)
                    }
                );
        }
    }

    click(artist: Artist | undefined) {
        this.artist = artist
        console.log(this.artist)

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
            if (this.titres?.data) {
                this.trackToAdd = [...this.titres?.data];
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
        if (this.titres != undefined) {
            this.playerService.setTrackList(this.titres?.data);
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

    addToFavorites() {
        this.trackToAdd.forEach(track => {
            this.favorite(track);
        });
        this.trackToAdd = [];
        this.listCheck.forEach(check => check.checked = false);
    }

    isArtistFavorite() {
        return this.playerService.favoriteArtists.find(artist => artist.id == this.artist?.id) != null;
    }

    async favoriteArtist() {
        if (this.artist) {
            this.playerService.favoriteArtists.push(this.artist);
            await firstValueFrom(this.deezerService.addArtistToFavorite(this.artist.id));
        }
    }

    async unfavoriteArtist() {
        if (this.artist) {
            this.playerService.favoriteArtists = this.playerService.favoriteArtists.filter(artist => artist.id != this.artist?.id);
            await firstValueFrom(this.deezerService.removeArtistFromFavorite(this.artist.id));
        }
    }
}

import {Component, OnInit} from '@angular/core';
import {Track} from "../../models/track.model";
import {firstValueFrom} from "rxjs";
import {PlayerService} from "../../services/player.service";
import {DeezerService} from "../../services/deezer.service";
import {faEllipsisH, faPlayCircle, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-favorite-tracks',
    templateUrl: './favorite-tracks.component.html',
    styleUrls: ['./favorite-tracks.component.scss']
})
export class FavoriteTracksComponent implements OnInit {

    public faEllipsisH = faEllipsisH;
    public faPlayCircle = faPlayCircle;
    public fasHeart = fasHeart;
    public farHeart = farHeart;

    public tracks: Track[] = [];
    public trackToAdd: Track[] = [];
    public listCheck: { id: number, checked: boolean }[] = [];

    constructor(private playerService: PlayerService, private deezerService: DeezerService) {
    }

    async ngOnInit() {
        if (this.playerService.favoriteTracks.length == 0) {
            this.playerService.favoriteTracks = (await firstValueFrom(this.deezerService.getFavoriteTracks())).data;
        }
        this.tracks = this.playerService.favoriteTracks;
        this.tracks.forEach(track => {
            this.listCheck.push({id: track.id, checked: false});
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
            this.trackToAdd = [...this.tracks];
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
        this.playerService.setTrackList(this.tracks);
        this.playerService.jumpTo(i);
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

    removeFromFavorites() {
        this.trackToAdd.forEach(track => {
            this.unfavorite(track);
        });
        this.trackToAdd = [];
        this.listCheck.forEach(check => check.checked = false);
    }

}

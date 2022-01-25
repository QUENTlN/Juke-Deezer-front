import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DeezerService} from "../../services/deezer.service";
import {Playlist} from "../../models/playlist.model";
import {Track} from "../../models/track.model";
import {faEllipsisH, faPlay, faPlayCircle, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
import {firstValueFrom} from "rxjs";
import {PlayerService} from "../../services/player.service";

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

    faEllipsisH = faEllipsisH
    faPlay = faPlay;
    faPlayCircle = faPlayCircle;
    fasHeart = fasHeart;
    farHeart = farHeart;

    trackToAdd: Track[] = [];
    listCheck: { id: number, checked: boolean }[] = [];

    public playlist: Playlist | undefined;

    constructor(private _activatedRoute: ActivatedRoute, private deezerService: DeezerService, private route: ActivatedRoute, private playerService: PlayerService) {
        this._activatedRoute.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.deezerService.getPlaylist(params['id'])
                .subscribe((data) => {
                        this.playlist = data;
                        this.playlist.tracks.data.forEach(track => {
                            this.listCheck.push({id: track.id, checked: false});
                        })
                    }
                );
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
            if (this.playlist?.tracks) {
                this.trackToAdd = [...this.playlist.tracks.data];
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
        if (this.playlist?.tracks != undefined) {
            this.playerService.setTrackList(this.playlist.tracks.data);
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

}

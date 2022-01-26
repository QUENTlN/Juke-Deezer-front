import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {ActivatedRoute} from "@angular/router";
import {Track} from "../../models/track.model";
import {PlayerService} from "../../services/player.service";
import {Radio} from "../../models/radio.model";
import {firstValueFrom} from "rxjs";
import {faEllipsisH, faPlay, faPlayCircle, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-radio-details',
    templateUrl: './radio-details.component.html',
    styleUrls: ['./radio-details.component.scss']
})
export class RadioDetailsComponent implements OnInit {

    faEllipsisH = faEllipsisH
    faPlayCircle = faPlayCircle;
    fasHeart = fasHeart;
    farHeart = farHeart;

    idRadio: number | undefined;
    radio: Radio | undefined;
    tracks: Track[] | undefined;

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
        this.idRadio = history.state?.id;
        this.radio = history.state;
        if (this.idRadio != undefined) {
            this.deezerService.getRadioTracks(this.idRadio)
                .subscribe((data) => {
                        this.tracks = data.data;
                        console.log(this.tracks)
                    }
                )
            this.deezerService.getRadioTracks(this.idRadio)
                .subscribe((data) => {
                        this.tracks = data.data;
                        this.tracks.forEach(track => {
                            this.listCheck.push({id: track.id, checked: false})
                        });
                    }
                );
        } else {
            this._activatedRoute.params.subscribe(params => {
                this.deezerService.getRadio(params['id']).subscribe((data) => {
                    this.radio = data;
                    this.idRadio = data.id;
                });
                this.deezerService.getRadioTracks(params['id'])
                    .subscribe((data) => {
                            this.tracks = data.data;
                            this.tracks.forEach(track => {
                                this.listCheck.push({id: track.id, checked: false})
                            });
                        }
                    );
            });
        }
        if (this.playerService.favoriteTracks.length == 0) {
            this.playerService.favoriteTracks = (await firstValueFrom(this.deezerService.getFavoriteTracks())).data;
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

    checkAll() {
        if (this.listCheck.every(check => !check.checked)) {
            this.listCheck.forEach(check => check.checked = true)
            if (this.tracks) {
                this.trackToAdd = [...this.tracks];
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
        if (this.tracks != undefined) {
            this.playerService.setTrackList(this.tracks);
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

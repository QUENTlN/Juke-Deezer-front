import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {ActivatedRoute} from "@angular/router";
import {ArtistList} from "../../models/artist-list.model";
import {PlayerService} from "../../services/player.service";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {firstValueFrom} from "rxjs";
import {Genre} from "../../models/genre.model";
import {Radio} from "../../models/radio.model";
import {Artist} from "../../models/artist.model";


@Component({
    selector: 'app-genre-details',
    templateUrl: './genre-details.component.html',
    styleUrls: ['./genre-details.component.scss']
})
export class GenreDetailsComponent implements OnInit {

    faPlayCircle=faPlayCircle;

    artists: Artist[] = [];
    idGenre: number | undefined;
    genre: Genre | undefined;
    radios: Radio[] = [];
    data: any | undefined;
    genreTitle: string | undefined;

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
        if (history.state?.id != null) {
            this.idGenre = history.state.id;
            this.genre = history.state;
            this.genreTitle = history.state.title;
            this.getArtistsAndRadios(history.state.id)
        } else {
            this._activatedRoute.params.subscribe(async params => {
                this.idGenre = params['id'];
                this.genre = (await firstValueFrom(this.deezerService.getGenre(params['id'])));
                this.genreTitle = this.genre.name;
                this.getArtistsAndRadios(params['id'])
            });
        }
    }

    getArtistsAndRadios(id: number) {
        this.deezerService.getArtistsByGenre(id)
            .subscribe((data) => {
                this.artists = data.data;
            });
        this.deezerService.getRadiosByGenre(id)
            .subscribe((data) => {
                this.radios = data.data;
            });
    }

    async playRadio(radio: Radio) {
        this.playerService.setTrackList((await firstValueFrom(this.deezerService.getRadioTracks(radio.id))).data);
        this.playerService.jumpTo(0);
    }

    click(data: any | undefined) {
        console.log(this.data)
        this.data = data

    }

}

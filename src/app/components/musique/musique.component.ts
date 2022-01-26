import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {AlbumList} from "../../models/album-list.model";
import {ArtistList} from "../../models/artist-list.model";
import {faPlayCircle, faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";
import {Album} from "../../models/album.model";
import {firstValueFrom} from "rxjs";
import {PlayerService} from "../../services/player.service";
import {Track} from "../../models/track.model";
import {TrackList} from "../../models/track-list.model";

@Component({
    selector: 'app-musique',
    templateUrl: './musique.component.html',
    styleUrls: ['./musique.component.scss']
})
export class MusiqueComponent implements OnInit {

    public faPlayCircle = faPlayCircle;
    public faSquareFull = faSquareFull
    public albums: AlbumList | undefined;
    public artists: ArtistList | undefined;
    public chart: TrackList | undefined;
    public data: any | undefined;


    constructor(private activatedRoute: ActivatedRoute, private router: Router, private deezerService: DeezerService, private playerService: PlayerService) {
    }

    ngOnInit(): void {

        this.albumsByUser()
        this.artistsByUser()
        this.chartsByUser()


    }

    albumsByUser() {
        this.deezerService.getAlbumByUser()
            .subscribe((data) => {
                    this.albums = data;
                }
            )
    }

    chartsByUser() {
        this.deezerService.getChartByUser()
            .subscribe((data) => {
                    this.chart = data;

                }
            )
    }

    artistsByUser() {
        this.deezerService.getArtistByUser()
            .subscribe((data) => {
                    this.artists = data;

                }
            )
    }

    click(data: any | undefined) {
        this.data = data

    }

    async play(album: Album) {
        this.playerService.setAlbum(await firstValueFrom(this.deezerService.getAlbum(album.id)));
        this.playerService.jumpTo(0);
    }

    playTrack(trackchart: Track) {
        this.playerService.setTrackList([trackchart]);
        this.playerService.jumpTo(0);
    }
}

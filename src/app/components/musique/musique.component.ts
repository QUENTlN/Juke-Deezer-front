import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {AlbumList} from "../../models/album-list.model";
import {ArtistList} from "../../models/artist-list.model";
import {faPlayCircle, faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {AlbumUserList} from "../../models/album-user-list.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Album} from "../../models/album.model";
import {firstValueFrom} from "rxjs";
import {PlayerService} from "../../services/player.service";
import {Track} from "../../models/track.model";

@Component({
    selector: 'app-musique',
    templateUrl: './musique.component.html',
    styleUrls: ['./musique.component.scss']
})
export class MusiqueComponent implements OnInit {

    faPlayCircle = faPlayCircle;
    faSquareFull = faSquareFull
    albums: AlbumList | undefined;
    artists: ArtistList | undefined;
    chart: AlbumUserList | undefined;
    data: any | undefined;


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
                    console.log(data)

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
        console.log(this.data)
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

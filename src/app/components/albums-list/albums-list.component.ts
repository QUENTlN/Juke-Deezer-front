import { Component, OnInit} from '@angular/core';
import {Album} from "../../models/album.model";
import {DeezerService} from "../../services/deezer.service";
import {faPlayCircle, faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {Artist} from "../../models/artist.model";
import {Track} from "../../models/track.model";
import {PlayerService} from "../../services/player.service";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

    public faPlayCircle=faPlayCircle;
    public idArtist:number|undefined;
    public albumsChart : Album[] | undefined;
    public artistChart : Artist[] | undefined;
    public trackChart : Track[] | undefined;
    public data:any|undefined;
    public faSquareFull = faSquareFull;

    constructor(private deezerService: DeezerService, private playerService: PlayerService) {
    }

    ngOnInit(): void {
        this.getAlbumChart()
        this.getArtistChart()
        this.getTrackChart()

        }

    getAlbumChart(){
        this.deezerService.getChart()
            .subscribe((data) => {
                    this.albumsChart = data?.albums?.data;
                }
            );

    }

    getArtistChart(){
        this.deezerService.getChart()
            .subscribe((data) => {
                    this.artistChart = data?.artists?.data;
                }
            );

    }
    getTrackChart(){
        this.deezerService.getChart()
            .subscribe((data) => {
                    this.trackChart = data?.tracks?.data;
                }
            );

    }

    click(data: any | undefined) {
        this.data = data
        console.log(this.data)

    }

    async play(album: Album) {
        this.playerService.setAlbum(await firstValueFrom(this.deezerService.getAlbum(album.id)));
        this.playerService.jumpTo(0);
    }
}


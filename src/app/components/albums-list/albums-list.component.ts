import { Component, OnInit} from '@angular/core';
import {Album} from "../../models/album.model";
import {DeezerService} from "../../services/deezer.service";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {Artist} from "../../models/artist.model";
import {Track} from "../../models/track.model";


@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    idArtist:number|undefined;
    albumsChart : Album[] | undefined;
    artistChart : Artist[] | undefined;
    trackChart : Track[] | undefined;
    data:any|undefined;

    constructor(private deezerService: DeezerService) {

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

}


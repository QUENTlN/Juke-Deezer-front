import { Component, OnInit} from '@angular/core';
import {Album} from "../../models/album.model";
import {DeezerService} from "../../services/deezer.service";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    idArtist:number|undefined;
    albumsChart : Album[] | undefined;
    album:Album|undefined;

    constructor(private deezerService: DeezerService) {

    }


    ngOnInit(): void {this.deezerService.getChart()
        .subscribe((data) => {
                this.albumsChart = data?.albums?.data;
            }
        );}

    click(album: Album | undefined) {
        this.album = album
        console.log(this.album)

    }

}


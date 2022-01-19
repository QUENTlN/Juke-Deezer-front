import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {Album} from "../../models/album.model";


@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit{

    idArtist!: number;
    album!: Album[] | undefined;

    constructor(private deezerService: DeezerService) { }

    ngOnInit() {

    }

    // Chart of Albums
    AlbumsChart() {
        this.deezerService.getChart()
            .subscribe((data) => {
                    this.album = data?.albums?.data;
                }
            );

    }

    // Find all albums of the artist -> Search
    AllAlbumsOfArtist() {
        this.deezerService.getArtistAlbums(this.idArtist)
            .subscribe((data) => {
                    this.album = data;
                }
            );

    }

}

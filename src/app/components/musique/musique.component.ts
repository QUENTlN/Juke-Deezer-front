import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {AlbumList} from "../../models/album-list.model";
import {ArtistList} from "../../models/artist-list.model";
import {Chart} from "../../models/chart.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {AlbumUser} from "../../models/album-user.model";
import {AlbumUserList} from "../../models/album-user-list.model";

@Component({
    selector: 'app-musique',
    templateUrl: './musique.component.html',
    styleUrls: ['./musique.component.scss']
})
export class MusiqueComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    albums: AlbumList | undefined;
    artists: ArtistList | undefined;
    chart: AlbumUserList | undefined;

    constructor(private deezerService: DeezerService) { }

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

            )}
    chartsByUser() {
        this.deezerService.getChartByUser()
            .subscribe((data) => {
                    this.chart = data;
                    console.log(data)

                }

            )}

    artistsByUser() {
        this.deezerService.getArtistByUser()
            .subscribe((data) => {
                    this.artists = data;

                }

            )}

}

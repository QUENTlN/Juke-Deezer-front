import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import { User } from 'src/app/models/user.model';
import {AlbumList} from "../../models/album-list.model";
import {ArtistList} from "../../models/artist-list.model";
import {Chart} from "../../models/chart.model";

@Component({
    selector: 'app-musique',
    templateUrl: './musique.component.html',
    styleUrls: ['./musique.component.scss']
})
export class MusiqueComponent implements OnInit {

    albums: AlbumList | undefined;
    artists: ArtistList | undefined;
    chart: Chart | undefined;

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

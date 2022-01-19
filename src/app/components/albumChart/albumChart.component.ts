import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {firstValueFrom} from "rxjs";
import {Chart} from "../../models/chart.model";
import {Album} from "../../models/album.model";
import {RadioList} from "../../models/radio-list.model";
import {AlbumList} from "../../models/album-list.model";

@Component({
  selector: 'app-chart',
  templateUrl: './albumChart.component.html',
  styleUrls: ['./albumChart.component.scss']
})
export class AlbumChartComponent implements OnInit {

    charts: any[] | undefined ;
    id!: number;

    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {
        this.deezerService.getChart()
            .subscribe((data) => {
                    this.charts = data?.albums?.data;
                    console.log()

                }
            );


    }

    albumsChart() {

    }

    podcastsChart(){
        this.deezerService.getChart()
            .subscribe((data) => {
                    this.charts = data?.podcasts?.data;
                    console.log()

                }
            );

    }

    artistsChart(){
        this.deezerService.getChart()
            .subscribe((data) => {
                    this.charts = data?.artists?.data;
                    console.log()

                }
            );

    }

}

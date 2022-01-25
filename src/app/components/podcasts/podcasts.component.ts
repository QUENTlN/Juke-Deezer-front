import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {PodcastList} from "../../models/podcast-list.model";
@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    podcastChart: any[] | undefined;
    podcasts: PodcastList | undefined;
    data:any|undefined;

    constructor(private deezerService: DeezerService) {
    }

    ngOnInit(): void {
        this.podcastsChart()
        this.getPodcasts()

    }

    podcastsChart() {
        this.deezerService.getChart()
        .subscribe((data) => {
        this.podcastChart = data?.podcasts?.data;


        }
    )}
    getPodcasts() {
        this.deezerService.getPodcasts()
            .subscribe((data) => {
                    this.podcasts = data;
                    console.log(this.podcasts)

                }
            )}
    click(data: any | undefined) {
        console.log(this.data)
        this.data = data

    }



}

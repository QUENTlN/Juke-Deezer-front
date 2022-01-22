import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {GenreList} from "../../models/genre-list.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {PodcastList} from "../../models/podcast-list.model";
import {Podcast} from "../../models/podcast.model";
@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    podcastChart: any[] | undefined;
    podcasts: PodcastList | undefined;

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




}

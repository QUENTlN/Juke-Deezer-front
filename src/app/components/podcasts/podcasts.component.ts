import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {GenreList} from "../../models/genre-list.model";

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {


    podcastChart: any[] | undefined;
    podcastGenre: GenreList | undefined;

    constructor(private deezerService: DeezerService) {
    }

    ngOnInit(): void {
        this.podcastsChart()
        this.podcastsGenre()

    }

    podcastsChart() {
        this.deezerService.getChart()
        .subscribe((data) => {
        this.podcastChart = data?.podcasts?.data;
        console.log()

        }
    )}



    podcastsGenre() {

        this.deezerService.getGenres()
        .subscribe((data) => {
                this.podcastGenre = data;
                console.log(data)

            }
        )}

}

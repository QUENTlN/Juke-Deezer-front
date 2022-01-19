import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {GenreList} from "../../models/genre-list.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    podcastChart: any[] | undefined;
    podcastGenre: GenreList | undefined;

    constructor(private deezerService: DeezerService) {
    }

    ngOnInit(): void {
        this.podcastsChart()


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

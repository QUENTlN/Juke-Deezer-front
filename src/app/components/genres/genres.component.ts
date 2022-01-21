import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {GenreList} from "../../models/genre-list.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    genres: GenreList| undefined ;
    podcastGenre:GenreList|undefined;

    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {
        this.allGenre()
    }

    allGenre() {
        this.deezerService.getGenres()
            .subscribe((data) => {
                    this.genres = data;
                    console.log(data)

                }
            );

    }
    podcastsGenre() {

        this.deezerService.getGenres()
            .subscribe((data) => {
                    this.podcastGenre = data;
                    console.log(data)

                }
            )}


}

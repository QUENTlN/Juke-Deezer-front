import { Component, OnInit } from '@angular/core';
import {Chart} from "../../models/chart.model";
import {DeezerService} from "../../services/deezer.service";
import {Genre} from "../../models/genre.model";
import {GenreList} from "../../models/genre-list.model";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {


    genres: GenreList| undefined ;

    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {

        this.deezerService.getGenres()
            .subscribe((data) => {
                    this.genres = data;
                    console.log(data)

                }
            );
    }

}

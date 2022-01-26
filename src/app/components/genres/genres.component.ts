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

    public faPlayCircle=faPlayCircle;
    public genres: GenreList| undefined ;
    public data:any|undefined;

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
    click(data: any | undefined) {
        console.log(this.data)
        this.data = data

    }
}

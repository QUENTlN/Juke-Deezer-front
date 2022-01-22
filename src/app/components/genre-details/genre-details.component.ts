import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {ActivatedRoute} from "@angular/router";
import {ArtistList} from "../../models/artist-list.model";


@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss']
})
export class GenreDetailsComponent implements OnInit {

    artists:ArtistList|undefined;
    idGenre:number|undefined;
    data:any|undefined;
    genreTitle:string|undefined;

    constructor(
        private deezerService:DeezerService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }

  ngOnInit(): void {
        this.idGenre = history.state?.id;
        this.genreTitle=history.state?.name;

        this.genreArtist()
  }

  genreArtist() {
      this.deezerService.getArtistsByGenre(this.idGenre)
          .subscribe((data) => {
                  this.artists = data;
              }
          );
  }

    click(data: any | undefined) {
        console.log(this.data)
        this.data = data

    }

}

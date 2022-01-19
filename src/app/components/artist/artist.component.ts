import {Component, OnInit} from '@angular/core';
import {Artist} from "../../models/artist.model";
import {DeezerService} from "../../services/deezer.service";
import {ArtistList} from "../../models/artist-list.model";
import {Chart} from "../../models/chart.model";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
    // Chart Artist
    artists:Artist[] | undefined
    // Search by artist > list all albums
    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {
        this.ArtistChart()
    }

    ArtistChart() {
        this.deezerService.getChart()
            .subscribe((data) => {
                    this.artists = data?.artists?.data;
                    console.log(data)
                }
            );

    }


}

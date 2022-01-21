import {Component, Input, OnInit} from '@angular/core';
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
    @Input()
    artist: Artist | undefined;
    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {

    }



}

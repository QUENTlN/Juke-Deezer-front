import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Track} from "../../models/track.model";
import {catchError, retry} from "rxjs/operators";
import {DeezerService} from "../../services/deezer.service";
import {TrackList} from "../../models/track-list.model";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

    tracks : TrackList |undefined;
    id!:number;
    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {
      this.deezerService.getTracksOfAlbum(9007781)
          .subscribe((data) => {
                  this.tracks = data;
                  console.log(data)
              }
          )}
}

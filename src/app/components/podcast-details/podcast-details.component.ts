import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss']
})
export class PodcastDetailsComponent implements OnInit {

    constructor(
        private deezerService:DeezerService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }
  ngOnInit(): void {
      console.log(history.state)
  }

}

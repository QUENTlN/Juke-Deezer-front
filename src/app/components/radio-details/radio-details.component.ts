import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {ActivatedRoute} from "@angular/router";
import {Track} from "../../models/track.model";

@Component({
  selector: 'app-radio-details',
  templateUrl: './radio-details.component.html',
  styleUrls: ['./radio-details.component.scss']
})
export class RadioDetailsComponent implements OnInit {
    idRadio:number|undefined;
    tracks:Track[]|undefined;

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
        this.findTracksofThisRadio()
    }

    findTracksofThisRadio(){
        this.idRadio=history.state?.id
        if(this.idRadio!=undefined) {
            this.deezerService.getRadioTracks(this.idRadio)
                .subscribe((data) => {
                    this.tracks = data;
                    console.log(this.tracks)
                }
                )}

    }

}

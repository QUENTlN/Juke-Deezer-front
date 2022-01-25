import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {RadioList} from "../../models/radio-list.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss']
})
export class RadiosComponent implements OnInit {
    faPlayCircle=faPlayCircle;

    radios: RadioList | undefined;
    data:any|undefined;


    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {

        this.deezerService.getRadios()
            .subscribe((data) => {
                this.radios = data;
                console.log(data)
    }
  );
    }

    click(data: any | undefined) {
        console.log(this.data)
        this.data = data

    }
}

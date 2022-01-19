import { Component, OnInit } from '@angular/core';
import {Radio} from "../../models/radio.model";
import {DeezerService} from "../../services/deezer.service";
import {firstValueFrom} from "rxjs";
import {Album} from "../../models/album.model";
import {RadioList} from "../../models/radio-list.model";



@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss']
})
export class RadiosComponent implements OnInit {


    radios: RadioList | undefined;


    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {

        this.deezerService.getRadios(2, 5)
            .subscribe((data) => {
                this.radios = data;
                console.log(data)
    }
  );
    }
}

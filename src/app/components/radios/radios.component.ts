import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {RadioList} from "../../models/radio-list.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {PlayerService} from "../../services/player.service";
import {Radio} from "../../models/radio.model";
import {firstValueFrom} from "rxjs";


@Component({
    selector: 'app-radios',
    templateUrl: './radios.component.html',
    styleUrls: ['./radios.component.scss']
})
export class RadiosComponent implements OnInit {
    faPlayCircle = faPlayCircle;

    radios: RadioList | undefined;
    data: any | undefined;


    constructor(private deezerService: DeezerService, private playerService: PlayerService) {
    }

    ngOnInit(): void {
        this.deezerService.getRadios()
            .subscribe((data) => {
                    this.radios = data;
                    console.log(data)
                }
            );
    }

    async playRadio(radio: Radio) {
        this.playerService.setTrackList((await firstValueFrom(this.deezerService.getRadioTracks(radio.id))).data);
        this.playerService.jumpTo(0);
    }

    click(data: any | undefined) {
        console.log(data)
        this.data = data

    }
}

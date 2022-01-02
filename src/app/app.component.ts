import {Component, OnInit} from '@angular/core';
import {DeezerService} from "./deezer.service";
import {firstValueFrom} from "rxjs";
import {AlbumList} from "./models/album-list.model";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'deezer';

    album: AlbumList | undefined;

    constructor(private deezerService: DeezerService) {
    }

    public async ngOnInit() {
        this.album = await firstValueFrom(this.deezerService.searchAlbums('The Beatles'));
        console.log(this.album);
    }
}

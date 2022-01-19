import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeezerService} from "../../services/deezer.service";
import {Album} from "../../models/album.model";
import {firstValueFrom} from "rxjs";



@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit{

    id!: number;
    album!: Album| undefined;

    constructor(private deezerService: DeezerService, private route: ActivatedRoute, private router: Router,) { }

    async ngOnInit() {

        this.id = 302127///this.route.snapshot.params['id'];
        this.album=await firstValueFrom(this.deezerService.getAlbum(this.id))
    }


}

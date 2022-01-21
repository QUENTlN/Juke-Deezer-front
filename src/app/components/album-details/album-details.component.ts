import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {Album} from "../../models/album.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Artist} from "../../models/artist.model";



@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})

export class AlbumDetailsComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    albumDetails: Album | undefined;
    idArtist: number | undefined;
    idAlbum:number|undefined;
    artist: Artist|undefined;

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

        if (history.state?.artist?.id != null){
            this.idArtist=history.state?.artist?.id;
            this.idAlbum=history.state?.id;}
        else{
            this.idArtist=history.state?.id;
        }

        this.deezerService.getAlbum(this.idAlbum)
            .subscribe((data) => {
                    this.albumDetails = data
                    console.log(this.albumDetails);

                }
            )

    }

}




import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeezerService} from "../../services/deezer.service";
import {Artist} from "../../models/artist.model";
import {TrackList} from "../../models/track-list.model";
import {PlaylistList} from "../../models/playlist-list.model";
import {ArtistList} from "../../models/artist-list.model";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {Album} from "../../models/album.model";

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {

    faPlayCircle=faPlayCircle;
    idArtist: number | undefined;
    artist:Artist|undefined;
    titres:TrackList|undefined;
    playlists: PlaylistList | undefined;
    relatedArtists:ArtistList|undefined;

    constructor(
        private deezerService:DeezerService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }

    ngOnInit(): void {

        if (history.state?.artist?.id != null) {
            this.idArtist = history.state?.artist?.id;
            this.artist=history.state?.artist;
        }
        else{
            this.idArtist=history.state?.id;
            this.artist=history.state;
        }



        this.getTitres()
        this.getPlaylist()
        this.getRelatedArtistsList()
    }
    getTitres(){
        this.deezerService.getTopTrackArtist(this.idArtist)
            .subscribe((data) => {
                    this.titres = data;
                    console.log(this.titres)
                }
            )
    }
    getPlaylist(){
        this.deezerService.getArtistPlaylists(this.idArtist)
            .subscribe((data) => {
                    this.playlists = data;
                    console.log(this.playlists)
                }
            )
    }
    getRelatedArtistsList(){
        this.deezerService.getRelatedArtists(this.idArtist)
            .subscribe((data) => {
                    this.relatedArtists = data;
                    console.log(this.playlists)
                }
            )
    }
    click(artist: Artist | undefined) {
        this.artist = artist
        console.log(this.artist)

    }
}

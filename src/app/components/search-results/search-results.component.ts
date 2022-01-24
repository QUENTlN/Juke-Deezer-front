import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeezerService} from "../../services/deezer.service";
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {PlayerService} from "../../services/player.service";
import {Album} from "../../models/album.model";
import {Artist} from "../../models/artist.model";
import {Track} from "../../models/track.model";




@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
    faPlayCircle=faPlayCircle;
    @Input() value: string | null | undefined;

    albumBySearch: Album[] | undefined;
    artistBySearch: Artist[] | undefined;
    trackBySearch: Track[] | undefined;

    data:any|undefined;


    constructor(
        private deezerService: DeezerService,
        private playerService: PlayerService,
        private route: ActivatedRoute
    ) {
        this.route.paramMap.subscribe(params => {
            this.ngOnInit();
        });
    }

    ngOnInit() {
        const valueName = this.route.snapshot.paramMap.get('name')
        if (valueName!= undefined || valueName !=null)
            this.value=valueName
            this.findAlbumsBySearch()
            this.findTracksBySearch()
            this.findArtistsBySearch()
    }



    findAlbumsBySearch() {
            if (this.value) {
                this.deezerService.searchAlbums(this.value)
                    .subscribe((data) => {
                            this.albumBySearch = data?.data;
                            console.log(data)
                        }
                    );
            }
        }

        findArtistsBySearch() {
            if (this.value) {
                this.deezerService.searchArtists(this.value)
                    .subscribe((data) => {
                            this.artistBySearch = data?.data;
                            console.log(data)
                        }
                    );
            }
        }

        findTracksBySearch() {
            if (this.value) {
                this.deezerService.searchTracks(this.value)
                    .subscribe((data) => {
                            this.trackBySearch = data?.data;
                            console.log(data)
                        }
                    );
            }
        }
    click(data: any | undefined) {
        console.log(this.data)
        this.data = data

    }

}

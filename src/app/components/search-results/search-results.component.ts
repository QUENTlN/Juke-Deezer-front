import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeezerService} from "../../services/deezer.service";
import {faPlayCircle, faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {PlayerService} from "../../services/player.service";
import {Album} from "../../models/album.model";
import {Artist} from "../../models/artist.model";
import {Track} from "../../models/track.model";
import {firstValueFrom} from "rxjs";


@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    public faSquareFull = faSquareFull;
    public faPlayCircle = faPlayCircle;
    @Input() public value: string | null | undefined;

    public albumBySearch: Album[] | undefined;
    public artistBySearch: Artist[] | undefined;
    public trackBySearch: Track[] | undefined;

    public data: any | undefined;


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
        if (valueName != undefined || valueName != null)
            this.value = valueName
        this.findAlbumsBySearch()
        this.findTracksBySearch()
        this.findArtistsBySearch()
    }


    findAlbumsBySearch() {
        if (this.value) {
            this.deezerService.searchAlbums(this.value)
                .subscribe((data) => {
                        this.albumBySearch = data?.data;
                    }
                );
        }
    }

    findArtistsBySearch() {
        if (this.value) {
            this.deezerService.searchArtists(this.value)
                .subscribe((data) => {
                        this.artistBySearch = data?.data;
                    }
                );
        }
    }

    findTracksBySearch() {
        if (this.value) {
            this.deezerService.searchTracks(this.value)
                .subscribe((data) => {
                        this.trackBySearch = data?.data;
                    }
                );
        }
    }

    click(data: any | undefined) {
        this.data = data

    }


    playTrack(trackchart: Track) {
        this.playerService.setTrackList([trackchart]);
        this.playerService.jumpTo(0);
    }

    async playAlbum(album: Album) {
        this.playerService.setAlbum(await firstValueFrom(this.deezerService.getAlbum(album.id)));
        this.playerService.jumpTo(0);
    }
}

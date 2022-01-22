import {Component, Input, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {DeezerService} from "../../services/deezer.service";
import {AlbumList} from "../../models/album-list.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    faSearch = faSearch;

    @Input() navbarLocation: string = 'navbar'
    value: string | undefined;
    onEnter(value: string) { this.value = value; }
    albumBySearch:AlbumList|undefined;

    constructor(private deezerService: DeezerService) { }

    ngOnInit(): void {
        this.findAlbumsBySearch()
    }

    findAlbumsBySearch() {
        this.deezerService.searchAlbums(this.value)
            .subscribe((data) => {
                    this.albumBySearch = data;
                    console.log(data)
                }
            );
    }


}

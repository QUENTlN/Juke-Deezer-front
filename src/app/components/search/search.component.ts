import {Component, Input, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    faSearch = faSearch;

    @Input() navbarLocation: string = 'navbar'

    constructor() {
    }

    ngOnInit(): void {
    }

}

import {Component, Input, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    faSearch = faSearch;

    @Input() navbarLocation: string = 'navbar'
    value: string|undefined;
    private searchTerms = new Subject<string>();

    constructor() {
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    async ngOnInit(): Promise<void> {
        this.searchTerms.pipe(
            debounceTime(100),
            distinctUntilChanged()
        );
    }






}

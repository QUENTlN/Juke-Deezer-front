import {Component, Input, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Router} from "@angular/router";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    public faSearch = faSearch;

    @Input() public navbarLocation: string = 'navbar'

    constructor(private router: Router) {
    }

    search(term: string): void {
        this.router.navigate(['/search', term]);
    }

    ngOnInit(): void {
    }






}

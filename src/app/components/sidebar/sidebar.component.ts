import {Component, Input, OnInit} from '@angular/core';
import {faChevronLeft, faChevronRight, faTimes, faBars, faSearch, faHome, faMusic, faMicrophone, faCompactDisc, faStar} from '@fortawesome/free-solid-svg-icons';
import {ThemeService} from "../../services/theme.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Input() show: boolean = true;

    faSearch = faSearch;
    faHome = faHome;
    faMusic = faMusic;
    faMicrophone = faMicrophone;
    faCompactDisc = faCompactDisc;
    faStar = faStar;

    constructor(public themeService: ThemeService) {
    }

    ngOnInit(): void {
    }

}

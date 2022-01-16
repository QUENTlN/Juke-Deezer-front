import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    faBars,
    faChevronLeft,
    faChevronRight,
    faCompactDisc,
    faHome,
    faMicrophone,
    faMusic,
    faSearch,
    faStar,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import {DeezerService} from "../../services/deezer.service";
import {User} from "../../models/user.model";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;
    faTimes = faTimes;
    faBars = faBars;
    faSearch = faSearch;
    faHome = faHome;
    faMusic = faMusic;
    faMicrophone = faMicrophone;
    faCompactDisc = faCompactDisc;
    faStar = faStar;

    @Input() isSidebarDisplay: boolean = false;

    @Output() showSidebar = new EventEmitter<string>();

    @Input() isStickyNavbar: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleSidebar() {
        this.showSidebar.emit();
    }

    isConnected(): boolean {
        return DeezerService.getLoggedInUser() != null;
    }

    getLoggedInUser(): User | undefined {
        return DeezerService.getLoggedInUser();
    }
}

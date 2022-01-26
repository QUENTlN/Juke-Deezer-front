import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    faBars,
    faChevronLeft,
    faChevronRight,
    faCompactDisc,
    faSearch,
    faStar,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import {DeezerService} from "../../services/deezer.service";
import {User} from "../../models/user.model";
import {Location} from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public faChevronLeft = faChevronLeft;
    public faChevronRight = faChevronRight;
    public faTimes = faTimes;
    public faBars = faBars;
    public faSearch = faSearch;
    public faCompactDisc = faCompactDisc;
    public faStar = faStar;

    @Input() isSidebarDisplay: boolean = false;

    @Output() showSidebar = new EventEmitter<string>();

    @Input() isStickyNavbar: boolean = false;

    constructor(private location: Location) {
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

    back() {
        this.location.back();
    }

    forward() {
        this.location.forward();
    }
}

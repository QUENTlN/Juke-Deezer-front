import {Component, Input, OnInit} from '@angular/core';
import {
    faGripHorizontal,
    faHome,
    faMicrophone,
    faMusic,
    faPodcast,
    faSearch,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import {ThemeService} from "../../services/theme.service";
import {DeezerService} from "../../services/deezer.service";
import {Router, Routes} from "@angular/router";

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
    faPodcast = faPodcast;
    faStar = faStar;
    faGripHorizontal = faGripHorizontal;

    constructor(public route: Router, public themeService: ThemeService) {
    }

    ngOnInit(): void {
    }

    public getSiteLogo(): string {
        return ThemeService.getSiteLogo();
    }

    public isConnected(): boolean {
        return DeezerService.getLoggedInUser() != null;
    }
    backtoHome() {
        this.route.navigate(['/home']);
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {faGripHorizontal, faHome, faMusic, faPodcast, faSearch, faStar} from '@fortawesome/free-solid-svg-icons';
import {ThemeService} from "../../services/theme.service";
import {DeezerService} from "../../services/deezer.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Input() public show: boolean = true;

    public faSearch = faSearch;
    public faHome = faHome;
    public faMusic = faMusic;
    public faPodcast = faPodcast;
    public faStar = faStar;
    public faGripHorizontal = faGripHorizontal;

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

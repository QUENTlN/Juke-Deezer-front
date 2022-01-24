import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeService} from "./services/theme.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'deezer';

    isSidebarDisplayed: boolean = false;

    constructor() {
    }

    public async ngOnInit() {
        ThemeService.setLightTheme();
    }

    @HostListener('window:resize')
    onResize() {
        if (window.innerWidth < 1030) {
            this.isSidebarDisplayed = false;
        }
    }

    toggleSidebar() {
        this.isSidebarDisplayed = !this.isSidebarDisplayed;
    }
}

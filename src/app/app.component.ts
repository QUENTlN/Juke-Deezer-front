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

    constructor(public themeService: ThemeService) {
    }

    public async ngOnInit() {
        this.themeService.setLightTheme();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        if (window.innerWidth < 1030) {
            this.isSidebarDisplayed = false;
        }
    }

    toggleSidebar() {
        this.isSidebarDisplayed = !this.isSidebarDisplayed;
        this.themeService.setDarkTheme();
    }
}

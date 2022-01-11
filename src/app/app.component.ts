import {Component, HostListener, OnInit} from '@angular/core';
import {faChevronLeft, faChevronRight, faTimes, faBars, faSearch, faHome, faMusic, faMicrophone, faCompactDisc, faStar} from '@fortawesome/free-solid-svg-icons';
import {faDeezer} from '@fortawesome/free-brands-svg-icons';
import {ThemeService} from "./services/theme.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'deezer';

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
    faDeezer = faDeezer;

    show: boolean = false;
    stickyNavbar: boolean = false;

    constructor(public themeService: ThemeService) {
    }

    public async ngOnInit() {
        this.themeService.setLightTheme();
    }

    public toggleMenu() {
        this.show = !this.show;
        this.themeService.setDarkTheme();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        if (window.innerWidth < 911) {
            this.show = false;
        }
    }

    // TODO: add @HostListener('scroll', ['$event']) when it have it own component
    onContainerScroll(event: any) {
        if (event.target.scrollTop > 30) {
            this.stickyNavbar = true;
        } else if (event.target.scrollTop == 0)  {
            this.stickyNavbar = false;
        } else if (event.target.scrollTop == 1200) {
            this.stickyNavbar = true;
        }
    }
}

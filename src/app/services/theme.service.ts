import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor() {
    }

    public static setDefaultTheme() {
        if (ThemeService.getTheme() == 'dark') {
            ThemeService.setDarkTheme();
        } else {
            ThemeService.setLightTheme();
        }
    }

    public static getTheme(): string {
        if (localStorage.getItem('theme') == null) {
            ThemeService.setDarkTheme();
            return 'dark';
            // ThemeService.setLightTheme();
            // return 'light';
        }
        // @ts-ignore
        return localStorage.getItem('theme');
    }

    public static toggleTheme() {
        if (ThemeService.getTheme() === 'light') {
            ThemeService.setDarkTheme();
        } else {
            ThemeService.setLightTheme();
        }
    }

    public static setDarkTheme() {
        localStorage.setItem('theme', 'dark');
        document.documentElement.style.setProperty('--main-color', '#000000');
        document.documentElement.style.setProperty('--background-color', '#0a0a0a'); //151515 131313 111111
        document.documentElement.style.setProperty('--primary-color', '#212529');
        document.documentElement.style.setProperty('--secondary-color', '#888');
        document.documentElement.style.setProperty('--font-color', '#fff');
        document.documentElement.style.setProperty('--accent-color', '#D4145A');
        document.documentElement.style.setProperty('--accent-gradient', 'linear-gradient(135deg, rgba(251,176,59,1) 0%, rgba(212,20,90,1) 50%)'); // #FF512F → #DD2476 , #FF5F6D → #FFC371 , #D4145A → #FBB03B
    }

    public static setLightTheme() {
        localStorage.setItem('theme', 'light');
        document.documentElement.style.setProperty('--main-color', '#ffffff');
        document.documentElement.style.setProperty('--background-color', '#fff');
        document.documentElement.style.setProperty('--primary-color', '#eaeaea');
        document.documentElement.style.setProperty('--secondary-color', '#525252');
        document.documentElement.style.setProperty('--font-color', '#0a0a0a');
        document.documentElement.style.setProperty('--accent-color', '#4f66ff'); // #4E65FF → #92EFFD
        document.documentElement.style.setProperty('--accent-gradient', 'linear-gradient(135deg, rgba(146,239,253,1) 0%, rgba(78,101,255,1) 50%)'); // #2E3192 → #1BFFFF , #4E65FF → #92EFFD
    }

    public static getSiteLogo() {
        return ThemeService.getTheme() === 'dark' ? '../assets/img/logo_dark.png' : '../assets/img/logo_light.png';
    }
}

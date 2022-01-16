import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor() {
    }

    public static getTheme(): string {
        if (localStorage.getItem('theme') == null) {
            ThemeService.setDarkTheme();
            return 'dark';
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
        document.documentElement.style.setProperty('--background-color', '#0a0a0a');
        document.documentElement.style.setProperty('--primary-color', '#212529');
        document.documentElement.style.setProperty('--secondary-color', '#888');
        document.documentElement.style.setProperty('--font-color', '#fff');
    }

    public static setLightTheme() {
        localStorage.setItem('theme', 'light');
        document.documentElement.style.setProperty('--main-color', '#ffffff');
        document.documentElement.style.setProperty('--background-color', '#fff');
        document.documentElement.style.setProperty('--primary-color', '#eaeaea');
        document.documentElement.style.setProperty('--secondary-color', '#525252');
        document.documentElement.style.setProperty('--font-color', '#0a0a0a');

    }

    public static getSiteLogo() {
        return ThemeService.getTheme() === 'dark' ? '../assets/img/Deezer_Logo_RVB_White.svg' : '../assets/img/Deezer_Logo_RVB_Black.svg';
    }
}

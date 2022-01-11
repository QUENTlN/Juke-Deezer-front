import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    darkTheme: boolean = true;

    constructor() {
    }

    public toogleTheme() {
        if (this.darkTheme) {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    public setDarkTheme() {
        this.darkTheme = true;
        document.documentElement.style.setProperty('--main-color', '#000000');
        document.documentElement.style.setProperty('--background-color', '#0a0a0a');
        document.documentElement.style.setProperty('--primary-color', '#212529');
        document.documentElement.style.setProperty('--secondary-color', '#888');
        document.documentElement.style.setProperty('--font-color', '#fff');
    }

    public setLightTheme() {
        this.darkTheme = false;
        document.documentElement.style.setProperty('--main-color', '#ffffff');
        document.documentElement.style.setProperty('--background-color', '#fff');
        document.documentElement.style.setProperty('--primary-color', '#eaeaea');
        document.documentElement.style.setProperty('--secondary-color', '#525252');
        document.documentElement.style.setProperty('--font-color', '#0a0a0a');

    }

    getSiteLogo() {
        return this.darkTheme ? '../assets/img/Deezer_Logo_RVB_White.svg' : '../assets/img/Deezer_Logo_RVB_Black.svg';
    }
}

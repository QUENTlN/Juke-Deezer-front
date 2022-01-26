import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {DeezerService} from "../../services/deezer.service";
import {Options} from "../../models/options.model";

@Component({
    selector: 'app-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

    public options: Options | undefined;

    constructor(private themeService: ThemeService, private deezerService: DeezerService) {
    }

    ngOnInit(): void {
        this.afficherOptions()

    }

    toggleTheme() {
        ThemeService.toggleTheme()
    }

    afficherOptions() {
        this.deezerService.getOptions()
            .subscribe((data) => {
                    this.options = data;
                }
            )
    }

    boolToString(boolValue: boolean) {
        return boolValue ? "Oui" : "Non";
    }

}

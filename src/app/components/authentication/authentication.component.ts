import {Component, OnInit} from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

    constructor(private deezerService: DeezerService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {

        this.route.queryParamMap.subscribe(params => {
            if (params.get('code')) {
                this.deezerService.auth(params.get('code'))
                    .then(() => {
                        this.router.navigate(['/']);
                    });
            } else {
                this.deezerService.login();
            }
        });
    }

}

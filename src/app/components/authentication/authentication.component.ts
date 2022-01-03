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

    test: string | undefined;

    ngOnInit(): void {

        // this.deezerService.getAccessToken('frbbafacc2e4d904f7a0a6c4e85906dd');
        this.route.queryParamMap.subscribe(params => {
            console.log(params.get('code'));
            if (params.get('code')) {
                this.deezerService.getAccessToken(params.get('code'));
                this.test = this.deezerService.accessToken;
                console.log(this.test);
            } else {
                this.deezerService.login();
            }
        });
        // this.deezerService.auth();
        // this.router.navigate(['/']);
    }

}

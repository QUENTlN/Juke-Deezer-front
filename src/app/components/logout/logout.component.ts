import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private deezerService: DeezerService, private router: Router) { }

  ngOnInit(): void {
      this.deezerService.logout();
      this.router.navigate(['/']);

  }

}

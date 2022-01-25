import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

    me:User|undefined;
    constructor(private deezerService: DeezerService) { }

  ngOnInit(): void {
        this.getUserInfo()
  }

  getUserInfo(){
      this.deezerService.getMe()
          .subscribe((data) => {
                  this.me = data;
                  console.log(data)

              }
          );

  }

}

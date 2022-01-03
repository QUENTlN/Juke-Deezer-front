import { Component, OnInit } from '@angular/core';
import {DeezerService} from "../../services/deezer.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private deezerService: DeezerService) { }

  ngOnInit(): void {
      this.deezerService.login();
  }

}

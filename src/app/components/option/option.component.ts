import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  constructor(private themeService :ThemeService) { }

  ngOnInit(): void {

  }

  toggleTheme(){
      ThemeService.toggleTheme()
  }

}

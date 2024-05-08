import { Component, OnInit } from '@angular/core';
import { ThemeHandlerService } from './services/themeHandler/theme-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public themeHandlerService: ThemeHandlerService) {}

  title = 'PokedexByAndiS';

  ngOnInit(): void {
    const darkModeEnabled = localStorage.getItem('darkMode');
    if (darkModeEnabled !== null) {
      this.themeHandlerService.darkMode = JSON.parse(darkModeEnabled);
    }
  }
}

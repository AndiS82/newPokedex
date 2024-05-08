import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeHandlerService {
  constructor() {}

  darkMode: boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
}

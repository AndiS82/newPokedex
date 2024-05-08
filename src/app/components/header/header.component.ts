import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IPokemon, IResponse, IResult } from 'src/app/interfaces/pokemon';
import { ApiHandlerService } from 'src/app/services/apiHandler/api-handler.service';
import { LanguageHandlerService } from 'src/app/services/languageHandler/language-handler.service';
import { SearchHandlerService } from 'src/app/services/searchHandler/search-handler.service';
import { ThemeHandlerService } from 'src/app/services/themeHandler/theme-handler.service';
import DE from '../../../assets/lang/german.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private apiHandlerService: ApiHandlerService,
    public themeHandlerService: ThemeHandlerService,
    private searchHandlerService: SearchHandlerService,
    private languageHandlerService: LanguageHandlerService
  ) {}

  private componentDestroyed$ = new Subject<void>();
  searchTerm = '';
  filterValue = '';
  allPokemon: IPokemon[] = [];
  allTypes: IResult[] = [];
  language = 'DE';
  lang = DE;
  darkMode = false;
  modeIcon = 'light_mode';
  activeFilter = '';

  ngOnInit(): void {
    this.getPokemon();
    this.getTypes();
  }

  search() {
    this.searchHandlerService.setInputValue(this.searchTerm);
  }

  filterByType() {
    this.searchHandlerService.setFilterValue(this.filterValue);
  }

  reset() {
    if (this.searchTerm === '') return;
    this.searchTerm = '';
    this.searchHandlerService.setInputValue('');
    this.activeFilter = '';
    this.searchHandlerService.setFilterValue('');
  }

  getPokemon() {
    this.apiHandlerService
      .getAll()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (data) => {
          const results = (data as IResponse).results as IPokemon[];
          results.forEach((result) => this.allPokemon.push(result));
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  chooseLanguage() {
    this.language = this.language === 'DE' ? 'EN' : 'DE';
    this.lang = this.language === 'DE' ? DE : [];
    this.languageHandlerService.setValue(this.language);
  }

  toggleMode() {
    this.themeHandlerService.toggleDarkMode();
    this.modeIcon = this.modeIcon === 'light_mode' ? 'dark_mode' : 'light_mode';
  }

  getTypes() {
    this.apiHandlerService
      .getPokemonTypes()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (data) => {
          (data.results as IResult[]).forEach((result) => {
            if (result.name !== 'stellar' && result.name !== 'unknown')
              this.allTypes.push({
                name: result.name,
                url: result.url,
              } as IResult);
          });
        },
      });
  }

  getTypeClass(typeName: string): string {
    switch (typeName) {
      case 'normal':
        return 'Normal';
      case 'grass':
        return 'Pflanze';
      case 'fire':
        return 'Feuer';
      case 'water':
        return 'Wasser';
      case 'electric':
        return 'Elektro';
      case 'fighting':
        return 'Kampf';
      case 'flying':
        return 'Flug';
      case 'poison':
        return 'Gift';
      case 'ground':
        return 'Boden';
      case 'rock':
        return 'Gestein';
      case 'bug':
        return 'Käfer';
      case 'ice':
        return 'Eis';
      case 'psychic':
        return 'Psycho';
      case 'ghost':
        return 'Geist';
      case 'dragon':
        return 'Drache';
      case 'dark':
        return 'Unlicht';
      case 'steel':
        return 'Stahl';
      case 'fairy':
        return 'Fee';
      default:
        return '';
    }
  }

  setFilter(type: string) {
    this.searchTerm = '';
    this.searchHandlerService.setInputValue('');
    if (this.activeFilter === type) {
      this.activeFilter = '';
      this.searchHandlerService.setFilterValue('');
    } else {
      this.activeFilter = type;
      this.searchHandlerService.setFilterValue(type);
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}

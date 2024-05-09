import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil, Subject } from 'rxjs';
import { IPokemon, IType } from 'src/app/interfaces/pokemon';
import { ApiHandlerService } from 'src/app/services/apiHandler/api-handler.service';
import { SearchHandlerService } from 'src/app/services/searchHandler/search-handler.service';
import { ThemeHandlerService } from 'src/app/services/themeHandler/theme-handler.service';
import DE from '../../../assets/lang/german.json';
import { LanguageHandlerService } from 'src/app/services/languageHandler/language-handler.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private apiHandler: ApiHandlerService,
    public themeHandlerService: ThemeHandlerService,
    private searchHandlerService: SearchHandlerService,
    private languageHandlerService: LanguageHandlerService,
    public dialog: MatDialog
  ) {}

  private componentDestroyed$ = new Subject<void>();
  inputValue = '';
  pokemonList: IPokemon[] = [];
  allPokemon: IPokemon[] = [];
  searchResults: IPokemon[] = [];
  mode = 'divLight';
  showScrollToTopButton: boolean = false;
  offset = 0;
  offsetLimit = 20;
  lang = DE;
  language = '';
  type = '';

  ngOnInit(): void {
    this.searchHandlerService.inputValue$.subscribe((value) => {
      this.inputValue = value;
      this.search();
    });
    this.searchHandlerService.filterValue$.subscribe((value) => {
      this.type = value;
      this.searchResults = [];
      if (value) this.getPokemonByType(value);
    });

    this.offset = 0;
    this.offsetLimit = 20;
    this.getPokemon();
    if (this.allPokemon.length === 0) this.getAllPokemon();
    this.languageHandlerService.language$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
        this.language = data;
        this.lang = this.language === 'DE' ? DE : [];

        if (this.searchResults.length !== 0 && this.language !== 'DE') {
          this.searchResults = [...this.searchResults].map((item) => {
            const pokemon = this.allPokemon.find(
              (p: IPokemon): boolean => p.id === item.id
            );
            if (pokemon) {
              return {
                ...item,
                name: pokemon.name,
              };
            }
            return item;
          });
        } else if (this.searchResults.length !== 0 && this.language === 'DE') {
          this.searchResults = [...this.searchResults].map((item) => {
            const pokemon = DE.find((p: IPokemon): boolean => p.id === item.id);
            if (pokemon) {
              return {
                ...item,
                name: pokemon.name,
              };
            }
            return item;
          });
        } else {
          return;
        }
      });

    const darkModeEnabled = localStorage.getItem('darkMode');

    if (darkModeEnabled !== null) {
      this.mode === 'divDark';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= window.innerHeight) {
      this.showScrollToTopButton = true;
    } else {
      this.showScrollToTopButton = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPokemon() {
    this.apiHandler
      .getPokemon(this.offset, this.offsetLimit)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (data) => {
          (data.results as IPokemon[]).forEach((result) =>
            this.pokemonList.push({
              id: this.pokemonList.length + 1,
              name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
              url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                this.pokemonList.length + 1
              }.png`,
            } as IPokemon)
          );
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  getAllPokemon() {
    this.apiHandler
      .getAll()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (data) => {
          (data.results as IPokemon[]).forEach((result) =>
            this.allPokemon.push({
              id: this.allPokemon.length + 1,
              name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
              url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                this.allPokemon.length + 1
              }.png`,
            } as IPokemon)
          );
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  getDetails(id: number, name: string, url: string) {
    this.apiHandler
      .getPokemonById(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (result) => {
          const darkModeEnabled = localStorage.getItem('darkMode');
          const adjustId = '#' + ('000' + result.id).slice(-3);
          this.dialog.open(DetailsDialogComponent, {
            data: {
              data: result,
              lang: this.language,
              theme: darkModeEnabled === 'true' ? 'dark' : 'light',
              name: name,
              id: adjustId,
              url: url,
            },
          });
        },
      });
  }

  addOffset() {
    this.offset = this.offset + 20;
    this.getPokemon();
  }

  search() {
    if (this.inputValue.trim() === '') {
      this.searchResults = [];
      return;
    }

    const searchTermLower = this.inputValue.toLowerCase();
    const isNumeric =
      !isNaN(parseFloat(searchTermLower)) &&
      isFinite(parseFloat(searchTermLower));

    if (isNumeric) {
      const searchTerm = parseInt(searchTermLower, 10);
      if (this.language === 'DE') {
        this.searchResults = DE.filter(
          (pokemon: IPokemon) => pokemon.id === searchTerm
        );
      } else {
        this.searchResults = this.allPokemon.filter(
          (pokemon) => pokemon.id === searchTerm
        );
      }
    } else {
      if (this.language === 'DE') {
        this.searchResults = DE.filter((pokemon: IPokemon) =>
          pokemon.name.toLowerCase().includes(searchTermLower)
        );
      } else {
        this.searchResults = this.allPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTermLower)
        );
      }
    }
  }

  getPokemonByType(type: string) {
    this.apiHandler
      .getPokemonByType(type)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (data) => {
          (data.pokemon as IType[]).forEach((result) => {
            const getIdEn = this.allPokemon.find(
              (p) => p.name.toLowerCase() === result.pokemon.name
            );
            if (getIdEn && this.language === 'EN') {
              this.searchResults.push({
                id: getIdEn.id,
                name: getIdEn.name,
                url: getIdEn.url,
              });
            } else if (getIdEn && this.language === 'DE') {
              const getIdDe = (DE as IPokemon[]).find(
                (p) => getIdEn.id === p.id
              );
              if (getIdDe) {
                this.searchResults.push({
                  id: getIdDe.id,
                  name: getIdDe.name,
                  url: getIdEn.url,
                });
              }
            } else {
              return;
            }
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}

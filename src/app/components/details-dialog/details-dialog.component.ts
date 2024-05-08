import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeHandlerService } from 'src/app/services/themeHandler/theme-handler.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css'],
})
export class DetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public themeHandlerService: ThemeHandlerService,
    public dialogRef: MatDialogRef<DetailsDialogComponent>
  ) {}

  getStatLabel(index: number): string {
    switch (index) {
      case 0:
        return this.data.lang === 'DE' ? 'KP' : 'HP';
      case 1:
        return this.data.lang === 'DE' ? 'Angriff' : 'Attack';
      case 2:
        return this.data.lang === 'DE' ? 'Verteidigung' : 'Defense';
      case 3:
        return this.data.lang === 'DE' ? 'Spezial-Angriff' : 'Special-Attack';
      case 4:
        return this.data.lang === 'DE'
          ? 'Spezial-Verteidigung'
          : 'Special-Defense';
      case 5:
        return this.data.lang === 'DE' ? 'Initiative' : 'Speed';
      default:
        return '';
    }
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

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  close() {
    this.dialogRef.close();
  }
}

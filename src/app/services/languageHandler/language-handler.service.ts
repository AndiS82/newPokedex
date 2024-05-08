import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageHandlerService {
  constructor() {}

  private _language: BehaviorSubject<string> = new BehaviorSubject<string>(
    'DE'
  );
  public language$: Observable<string> = this._language.asObservable();
  language = '';

  setValue(language: string): void {
    this._language.next(language);
    this.language = language;
  }

  getValue() {
    return this.language;
  }
}

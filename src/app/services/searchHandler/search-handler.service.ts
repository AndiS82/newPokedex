import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchHandlerService {
  private inputValueSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  inputValue$: Observable<string> = this.inputValueSubject.asObservable();
  private filterValueSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  filterValue$: Observable<string> = this.filterValueSubject.asObservable();

  setInputValue(value: string) {
    this.inputValueSubject.next(value);
  }

  setFilterValue(value: string) {
    this.filterValueSubject.next(value);
  }
}

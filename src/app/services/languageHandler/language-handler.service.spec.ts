import { TestBed } from '@angular/core/testing';

import { LanguageHandlerService } from './language-handler.service';

describe('LanguageHandlerService', () => {
  let service: LanguageHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

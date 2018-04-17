import { TestBed, inject } from '@angular/core/testing';

import { BiblioService } from './biblio.service';

describe('BiblioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiblioService]
    });
  });

  it('should be created', inject([BiblioService], (service: BiblioService) => {
    expect(service).toBeTruthy();
  }));
});

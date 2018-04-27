import { TestBed, inject } from '@angular/core/testing';

import { AjoutEvenementService } from './ajout-evenement.service';

describe('AjoutEvenementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjoutEvenementService]
    });
  });

  it('should be created', inject([AjoutEvenementService], (service: AjoutEvenementService) => {
    expect(service).toBeTruthy();
  }));
});

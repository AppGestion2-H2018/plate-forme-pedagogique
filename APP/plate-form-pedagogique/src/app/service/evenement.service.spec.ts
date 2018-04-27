import { TestBed, inject } from '@angular/core/testing';

import { EvenementService } from './evenement.service';

describe('UtilisateurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvenementService]
    });
  });

  it('should be created', inject([EvenementService], (service: EvenementService) => {
    expect(service).toBeTruthy();
  }));
});

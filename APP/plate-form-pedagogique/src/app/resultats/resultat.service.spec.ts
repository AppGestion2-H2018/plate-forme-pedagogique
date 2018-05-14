import { TestBed, inject } from '@angular/core/testing';

import { ResultatService } from './resultat.service';

describe('ResultatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultatService]
    });
  });

  it('should be created', inject([ResultatService], (service: ResultatService) => {
    expect(service).toBeTruthy();
  }));
});

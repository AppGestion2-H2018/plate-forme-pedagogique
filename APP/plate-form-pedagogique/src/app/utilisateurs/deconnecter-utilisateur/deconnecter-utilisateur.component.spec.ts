import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconnecterUtilisateurComponent } from './deconnecter-utilisateur.component';

describe('DeconnecterUtilisateurComponent', () => {
  let component: DeconnecterUtilisateurComponent;
  let fixture: ComponentFixture<DeconnecterUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeconnecterUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeconnecterUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

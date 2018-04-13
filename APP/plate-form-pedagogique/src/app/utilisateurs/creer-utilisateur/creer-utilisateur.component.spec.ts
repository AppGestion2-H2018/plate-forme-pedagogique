import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerUtilisateurComponent } from './creer-utilisateur.component';

describe('CreerUtilisateurComponent', () => {
  let component: CreerUtilisateurComponent;
  let fixture: ComponentFixture<CreerUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

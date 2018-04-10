import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierutilisateurComponent } from './modifierutilisateur.component';

describe('ModifierutilisateurComponent', () => {
  let component: ModifierutilisateurComponent;
  let fixture: ComponentFixture<ModifierutilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierutilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

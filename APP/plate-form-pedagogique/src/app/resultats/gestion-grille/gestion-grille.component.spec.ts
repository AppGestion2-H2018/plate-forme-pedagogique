import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGrilleComponent } from './gestion-grille.component';

describe('GestionGrilleComponent', () => {
  let component: GestionGrilleComponent;
  let fixture: ComponentFixture<GestionGrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionGrilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionGrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

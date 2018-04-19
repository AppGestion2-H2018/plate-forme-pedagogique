import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutGrilleComponent } from './ajout-grille.component';

describe('AjoutGrilleComponent', () => {
  let component: AjoutGrilleComponent;
  let fixture: ComponentFixture<AjoutGrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutGrilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutGrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

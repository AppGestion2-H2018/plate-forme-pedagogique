import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioAjoutTabletteComponent } from './biblio-ajout-tablette.component';

describe('BiblioAjoutTabletteComponent', () => {
  let component: BiblioAjoutTabletteComponent;
  let fixture: ComponentFixture<BiblioAjoutTabletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioAjoutTabletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioAjoutTabletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioRechercheComponent } from './biblio-recherche.component';

describe('BiblioRechercheComponent', () => {
  let component: BiblioRechercheComponent;
  let fixture: ComponentFixture<BiblioRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

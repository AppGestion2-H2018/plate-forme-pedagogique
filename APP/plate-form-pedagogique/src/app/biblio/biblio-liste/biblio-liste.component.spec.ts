import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioListeComponent } from './biblio-liste.component';

describe('BiblioListeComponent', () => {
  let component: BiblioListeComponent;
  let fixture: ComponentFixture<BiblioListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

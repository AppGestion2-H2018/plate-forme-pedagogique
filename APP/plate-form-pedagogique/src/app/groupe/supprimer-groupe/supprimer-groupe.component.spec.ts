import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerGroupeComponent } from './supprimer-groupe.component';

describe('SupprimerGroupeComponent', () => {
  let component: SupprimerGroupeComponent;
  let fixture: ComponentFixture<SupprimerGroupeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerGroupeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

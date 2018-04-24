import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilPublicationsComponent } from './accueil-publications.component';

describe('AccueilPublicationsComponent', () => {
  let component: AccueilPublicationsComponent;
  let fixture: ComponentFixture<AccueilPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

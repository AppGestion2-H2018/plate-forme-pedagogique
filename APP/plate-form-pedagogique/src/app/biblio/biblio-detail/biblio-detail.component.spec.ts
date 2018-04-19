import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioDetailComponent } from './biblio-detail.component';

describe('BiblioDetailComponent', () => {
  let component: BiblioDetailComponent;
  let fixture: ComponentFixture<BiblioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

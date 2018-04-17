import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalBiblioComponent } from './principal-biblio.component';

describe('PrincipalBiblioComponent', () => {
  let component: PrincipalBiblioComponent;
  let fixture: ComponentFixture<PrincipalBiblioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalBiblioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

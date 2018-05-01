import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecherchePublicationsComponent } from './recherche-publications.component';

describe('RecherchePublicationsComponent', () => {
  let component: RecherchePublicationsComponent;
  let fixture: ComponentFixture<RecherchePublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecherchePublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecherchePublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

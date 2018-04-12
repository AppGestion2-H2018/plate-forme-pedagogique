import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPublicationsComponent } from './principal-publications.component';

describe('PrincipalPublicationsComponent', () => {
  let component: PrincipalPublicationsComponent;
  let fixture: ComponentFixture<PrincipalPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

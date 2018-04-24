import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalGroupesComponent } from './principal-groupes.component';

describe('PrincipalGroupesComponent', () => {
  let component: PrincipalGroupesComponent;
  let fixture: ComponentFixture<PrincipalGroupesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalGroupesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalGroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

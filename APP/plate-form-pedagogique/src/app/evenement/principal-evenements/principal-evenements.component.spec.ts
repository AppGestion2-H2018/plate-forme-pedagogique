import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalEvenementsComponent } from './principal-evenements.component';

describe('PrincipalEvenementsComponent', () => {
  let component: PrincipalEvenementsComponent;
  let fixture: ComponentFixture<PrincipalEvenementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalEvenementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalEvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalUtilisateursComponent } from './principal-utilisateurs.component';

describe('PrincipalUtilisateursComponent', () => {
  let component: PrincipalUtilisateursComponent;
  let fixture: ComponentFixture<PrincipalUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

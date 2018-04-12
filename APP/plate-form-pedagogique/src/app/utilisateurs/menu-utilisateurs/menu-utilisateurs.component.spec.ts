import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUtilisateursComponent } from './menu-utilisateurs.component';

describe('MenuUtilisateursComponent', () => {
  let component: MenuUtilisateursComponent;
  let fixture: ComponentFixture<MenuUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

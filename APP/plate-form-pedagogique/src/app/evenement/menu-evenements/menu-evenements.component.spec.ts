import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEvenementsComponent } from './menu-evenements.component';

describe('MenuEvenementsComponent', () => {
  let component: MenuEvenementsComponent;
  let fixture: ComponentFixture<MenuEvenementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEvenementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

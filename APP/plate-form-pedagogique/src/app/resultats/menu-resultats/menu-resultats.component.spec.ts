import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuResultatsComponent } from './menu-resultats.component';

describe('MenuResultatsComponent', () => {
  let component: MenuResultatsComponent;
  let fixture: ComponentFixture<MenuResultatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuResultatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuResultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

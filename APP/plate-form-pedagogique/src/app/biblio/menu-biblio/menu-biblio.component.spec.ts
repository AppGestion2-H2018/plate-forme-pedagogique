import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBiblioComponent } from './menu-biblio.component';

describe('MenuBiblioComponent', () => {
  let component: MenuBiblioComponent;
  let fixture: ComponentFixture<MenuBiblioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBiblioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

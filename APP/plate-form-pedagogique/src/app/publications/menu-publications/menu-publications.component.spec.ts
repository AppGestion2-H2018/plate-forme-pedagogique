import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPublicationsComponent } from './menu-publications.component';

describe('MenuPublicationsComponent', () => {
  let component: MenuPublicationsComponent;
  let fixture: ComponentFixture<MenuPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

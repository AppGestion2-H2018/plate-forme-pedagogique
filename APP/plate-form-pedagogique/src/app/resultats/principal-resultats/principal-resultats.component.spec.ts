import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalResultatsComponent } from './principal-resultats.component';

describe('PrincipalResultatsComponent', () => {
  let component: PrincipalResultatsComponent;
  let fixture: ComponentFixture<PrincipalResultatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalResultatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalResultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

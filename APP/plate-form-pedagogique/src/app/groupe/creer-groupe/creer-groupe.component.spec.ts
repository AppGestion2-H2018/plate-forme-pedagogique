import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerGroupeComponent } from './creer-groupe.component';

describe('CreerGroupeComponent', () => {
  let component: CreerGroupeComponent;
  let fixture: ComponentFixture<CreerGroupeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerGroupeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

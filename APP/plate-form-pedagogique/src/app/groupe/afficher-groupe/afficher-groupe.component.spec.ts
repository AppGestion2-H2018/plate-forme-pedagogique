import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherGroupeComponent } from './afficher-groupe.component';

describe('AfficherGroupeComponent', () => {
  let component: AfficherGroupeComponent;
  let fixture: ComponentFixture<AfficherGroupeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherGroupeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

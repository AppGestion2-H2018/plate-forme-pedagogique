import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherResultatsComponent } from './afficher-resultats.component';

describe('AfficherResultatsComponent', () => {
  let component: AfficherResultatsComponent;
  let fixture: ComponentFixture<AfficherResultatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherResultatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherResultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

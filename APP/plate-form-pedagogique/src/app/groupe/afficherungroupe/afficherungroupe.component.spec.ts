import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherungroupeComponent } from './afficherungroupe.component';

describe('AfficherungroupeComponent', () => {
  let component: AfficherungroupeComponent;
  let fixture: ComponentFixture<AfficherungroupeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherungroupeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherungroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionPublicationComponent } from './suppression-publication.component';

describe('SuppressionPublicationComponent', () => {
  let component: SuppressionPublicationComponent;
  let fixture: ComponentFixture<SuppressionPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppressionPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppressionPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

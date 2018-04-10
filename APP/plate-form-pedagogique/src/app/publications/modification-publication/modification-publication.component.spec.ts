import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationPublicationComponent } from './modification-publication.component';

describe('ModificationPublicationComponent', () => {
  let component: ModificationPublicationComponent;
  let fixture: ComponentFixture<ModificationPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

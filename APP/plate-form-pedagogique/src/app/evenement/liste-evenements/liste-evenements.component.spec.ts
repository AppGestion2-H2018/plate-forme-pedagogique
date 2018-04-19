import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEvenementsComponent } from './liste-evenements.component';

describe('ListeEvenementsComponent', () => {
  let component: ListeEvenementsComponent;
  let fixture: ComponentFixture<ListeEvenementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEvenementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

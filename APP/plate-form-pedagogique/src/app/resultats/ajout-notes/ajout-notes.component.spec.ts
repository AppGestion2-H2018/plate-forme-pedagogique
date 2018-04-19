import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutNotesComponent } from './ajout-notes.component';

describe('AjoutNotesComponent', () => {
  let component: AjoutNotesComponent;
  let fixture: ComponentFixture<AjoutNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

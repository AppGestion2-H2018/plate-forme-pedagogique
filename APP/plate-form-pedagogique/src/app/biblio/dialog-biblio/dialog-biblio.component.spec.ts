import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBiblioComponent } from './dialog-biblio.component';

describe('DialogBiblioComponent', () => {
  let component: DialogBiblioComponent;
  let fixture: ComponentFixture<DialogBiblioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBiblioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

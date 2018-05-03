import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioTabletteComponent } from './biblio-tablette.component';

describe('BiblioTabletteComponent', () => {
  let component: BiblioTabletteComponent;
  let fixture: ComponentFixture<BiblioTabletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioTabletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioTabletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

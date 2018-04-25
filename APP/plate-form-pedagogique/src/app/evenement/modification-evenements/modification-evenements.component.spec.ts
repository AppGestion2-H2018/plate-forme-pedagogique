import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationEvenementsComponent } from './modification-evenements.component';

describe('ModificationEvenementsComponent', () => {
  let component: ModificationEvenementsComponent;
  let fixture: ComponentFixture<ModificationEvenementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationEvenementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationEvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

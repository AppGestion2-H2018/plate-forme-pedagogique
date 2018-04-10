import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperermotdepasseComponent } from './recuperermotdepasse.component';

describe('RecuperermotdepasseComponent', () => {
  let component: RecuperermotdepasseComponent;
  let fixture: ComponentFixture<RecuperermotdepasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperermotdepasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperermotdepasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

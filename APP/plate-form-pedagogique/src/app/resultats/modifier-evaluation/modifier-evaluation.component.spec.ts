import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEvaluationComponent } from './modifier-evaluation.component';

describe('ModifierEvaluationComponent', () => {
  let component: ModifierEvaluationComponent;
  let fixture: ComponentFixture<ModifierEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

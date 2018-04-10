import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupererMotDePasseComponent } from './recuperer-mot-de-passe.component';

describe('RecupererMotDePasseComponent', () => {
  let component: RecupererMotDePasseComponent;
  let fixture: ComponentFixture<RecupererMotDePasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecupererMotDePasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecupererMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

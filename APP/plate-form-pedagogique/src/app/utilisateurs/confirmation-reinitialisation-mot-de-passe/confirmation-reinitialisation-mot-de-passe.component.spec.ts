import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationReinitialisationMotDePasseComponent } from './confirmation-reinitialisation-mot-de-passe.component';

describe('ConfirmationReinitialisationMotDePasseComponent', () => {
  let component: ConfirmationReinitialisationMotDePasseComponent;
  let fixture: ComponentFixture<ConfirmationReinitialisationMotDePasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationReinitialisationMotDePasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationReinitialisationMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

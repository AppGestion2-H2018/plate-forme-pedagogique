import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnecterutilisateurComponent } from './connecterutilisateur.component';

describe('ConnecterutilisateurComponent', () => {
  let component: ConnecterutilisateurComponent;
  let fixture: ComponentFixture<ConnecterutilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnecterutilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnecterutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

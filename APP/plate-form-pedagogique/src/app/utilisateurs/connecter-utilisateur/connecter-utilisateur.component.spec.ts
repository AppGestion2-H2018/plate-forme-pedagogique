import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnecterUtilisateurComponent } from './connecter-utilisateur.component';

describe('ConnecterUtilisateurComponent', () => {
  let component: ConnecterUtilisateurComponent;
  let fixture: ComponentFixture<ConnecterUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnecterUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnecterUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

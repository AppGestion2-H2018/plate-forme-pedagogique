import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSidenavModule, MatToolbarModule, MatCardModule, MatGridListModule, MatListModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BiblioComponent } from './biblio/biblio.component';
import { ConnecterUtilisateurComponent } from './utilisateurs/connecter-utilisateur/connecter-utilisateur.component';
import { CreerUtilisateurComponent } from './utilisateurs/creer-utilisateur/creer-utilisateur.component';
import { ModifierUtilisateurComponent } from './utilisateurs/modifier-utilisateur/modifier-utilisateur.component';
import { RecupererMotDePasseComponent } from './utilisateurs/recuperer-mot-de-passe/recuperer-mot-de-passe.component';
<<<<<<< HEAD
import { PrincipalUtilisateursComponent } from './utilisateurs/principal-utilisateurs/principal-utilisateurs.component';
import { MenuUtilisateursComponent } from './utilisateurs/menu-utilisateurs/menu-utilisateurs.component';
import { PrincipalBiblioComponent } from './biblio/principal-biblio/principal-biblio.component';
import { MenuBiblioComponent } from './biblio/menu-biblio/menu-biblio.component';
import { MenuPublicationsComponent } from './publications/menu-publications/menu-publications.component';
import { PrincipalPublicationsComponent } from './publications/principal-publications/principal-publications.component';
import { ModifierMotDePasseComponent } from './utilisateurs/modifier-mot-de-passe/modifier-mot-de-passe.component';
import { ConfirmationReinitialisationMotDePasseComponent } from './utilisateurs/confirmation-reinitialisation-mot-de-passe/confirmation-reinitialisation-mot-de-passe.component';
import { AjoutPublicationComponent } from './publications/ajout-publication/ajout-publication.component';
import { CreerGroupeComponent } from './groupe/creer-groupe/creer-groupe.component';
<<<<<<< HEAD
import { ClassesComponent } from './groupe/classes/classes.component';
=======
import { AjoutPublicationComponent } from './publications/ajout-publication/ajout-publication.component'
>>>>>>> b50818561af892f30e41aa916c00272fdcdd63de
=======
>>>>>>> 58f8b1b6faf07cfb947ede1ccb961d87b3d56449


@NgModule({
  declarations: [
    AppComponent,
    BiblioComponent,
    ConnecterUtilisateurComponent,
    CreerUtilisateurComponent,
    ModifierUtilisateurComponent,
    RecupererMotDePasseComponent,
    PrincipalUtilisateursComponent,
    MenuUtilisateursComponent,
    PrincipalBiblioComponent,
    MenuBiblioComponent,
    MenuPublicationsComponent,
    PrincipalPublicationsComponent
    ModifierMotDePasseComponent,
    ConfirmationReinitialisationMotDePasseComponent,
<<<<<<< HEAD
    CreerGroupeComponent,
    ClassesComponent
=======
    AjoutPublicationComponent,
    CreerGroupeComponent
>>>>>>> 58f8b1b6faf07cfb947ede1ccb961d87b3d56449
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

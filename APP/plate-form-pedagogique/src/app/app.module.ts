import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BiblioComponent } from './biblio/biblio.component';
import { ConnecterUtilisateurComponent } from './utilisateurs/connecter-utilisateur/connecter-utilisateur.component';
import { CreerUtilisateurComponent } from './utilisateurs/creer-utilisateur/creer-utilisateur.component';
import { ModifierUtilisateurComponent } from './utilisateurs/modifier-utilisateur/modifier-utilisateur.component';
import { RecupererMotDePasseComponent } from './utilisateurs/recuperer-mot-de-passe/recuperer-mot-de-passe.component';
import { ModifierMotDePasseComponent } from './utilisateurs/modifier-mot-de-passe/modifier-mot-de-passe.component';
import { ConfirmationReinitialisationMotDePasseComponent } from './utilisateurs/confirmation-reinitialisation-mot-de-passe/confirmation-reinitialisation-mot-de-passe.component';
import { AjoutPublicationComponent } from './publications/ajout-publication/ajout-publication.component'


@NgModule({
  declarations: [
    AppComponent,
    BiblioComponent,
    ConnecterUtilisateurComponent,
    CreerUtilisateurComponent,
    ModifierUtilisateurComponent,
    RecupererMotDePasseComponent,
    ModifierMotDePasseComponent,
    ConfirmationReinitialisationMotDePasseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

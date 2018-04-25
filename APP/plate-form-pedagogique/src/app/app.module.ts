import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ConnecterUtilisateurComponent} from './utilisateurs/connecter-utilisateur/connecter-utilisateur.component';
import {CreerUtilisateurComponent} from './utilisateurs/creer-utilisateur/creer-utilisateur.component';
import {ModifierUtilisateurComponent} from './utilisateurs/modifier-utilisateur/modifier-utilisateur.component';
import {RecupererMotDePasseComponent} from './utilisateurs/recuperer-mot-de-passe/recuperer-mot-de-passe.component';
import {PrincipalUtilisateursComponent} from './utilisateurs/principal-utilisateurs/principal-utilisateurs.component';
import {MenuUtilisateursComponent} from './utilisateurs/menu-utilisateurs/menu-utilisateurs.component';
import {PrincipalBiblioComponent} from './biblio/principal-biblio/principal-biblio.component';
import {MenuBiblioComponent} from './biblio/menu-biblio/menu-biblio.component';
import {MenuPublicationsComponent} from './publications/menu-publications/menu-publications.component';
import {PrincipalPublicationsComponent} from './publications/principal-publications/principal-publications.component';
import {ModifierMotDePasseComponent} from './utilisateurs/modifier-mot-de-passe/modifier-mot-de-passe.component';
import {ConfirmationReinitialisationMotDePasseComponent} from './utilisateurs/confirmation-reinitialisation-mot-de-passe/confirmation-reinitialisation-mot-de-passe.component';

import {UtilisateurService} from './service/utilisateur.service';

import {AjoutPublicationComponent} from './publications/ajout-publication/ajout-publication.component';
import {CreerGroupeComponent} from './groupe/creer-groupe/creer-groupe.component';
import {ClassesComponent} from './groupe/classes/classes.component';

import {FormsModule} from '@angular/forms';
import {PublicationService} from './publications/publication.service';

import {HttpClientModule} from '@angular/common/http';
import {BiblioService} from './service/biblio.service';

import {BiblioDetailComponent} from './biblio/biblio-detail/biblio-detail.component';
import {BiblioListeComponent} from './biblio/biblio-liste/biblio-liste.component';
import {AjoutEvenementComponent} from './evenement/ajout-evenement/ajout-evenement.component';
import {ListeEvenementsComponent} from './evenement/liste-evenements/liste-evenements.component';
import {MenuEvenementsComponent} from './evenement/menu-evenements/menu-evenements.component';
import {BiblioRechercheComponent} from './biblio/biblio-recherche/biblio-recherche.component';
import {AfficherGroupeComponent} from './groupe/afficher-groupe/afficher-groupe.component';
import {ModifierGroupeComponent} from './groupe/modifier-groupe/modifier-groupe.component';
import {SupprimerGroupeComponent} from './groupe/supprimer-groupe/supprimer-groupe.component';

import {AfficherResultatsComponent} from './resultats/afficher-resultats/afficher-resultats.component';
import {AjoutGrilleComponent} from './resultats/ajout-grille/ajout-grille.component';
import {AjoutNotesComponent} from './resultats/ajout-notes/ajout-notes.component';
import {MenuResultatsComponent} from './resultats/menu-resultats/menu-resultats.component';
import {PrincipalResultatsComponent} from './resultats/principal-resultats/principal-resultats.component';
import { PrincipalEvenementsComponent } from './evenement/principal-evenements/principal-evenements.component';
import { SchedulerComponent } from './evenement/scheduler/scheduler.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AppRoutingModule } from './/app-routing.module';
import { PrincipalGroupesComponent } from './groupe/principal-groupes/principal-groupes.component';
import { ModificationEvenementsComponent } from './evenement/modification-evenements/modification-evenements.component';
import { AccueilPublicationsComponent } from './publications/accueil-publications/accueil-publications.component';


// import { AjoutEvenementComponent } from './evenement/ajout-evenement/ajout-evenement-component';


@NgModule({
    declarations: [
        AppComponent,
        ConnecterUtilisateurComponent,
        CreerUtilisateurComponent,
        ModifierUtilisateurComponent,
        RecupererMotDePasseComponent,
        PrincipalUtilisateursComponent,
        MenuUtilisateursComponent,
        PrincipalBiblioComponent,
        MenuBiblioComponent,
        MenuPublicationsComponent,
        PrincipalPublicationsComponent,
        ModifierMotDePasseComponent,
        ConfirmationReinitialisationMotDePasseComponent,
        CreerGroupeComponent,
        ClassesComponent,
        CreerGroupeComponent,
        ClassesComponent,
        AjoutPublicationComponent,
        CreerGroupeComponent,
        // AjoutEvenementComponent,
        BiblioDetailComponent,
        BiblioListeComponent,
        AjoutEvenementComponent,
        ListeEvenementsComponent,
        MenuEvenementsComponent,
        BiblioRechercheComponent,
        AfficherGroupeComponent,
        ModifierGroupeComponent,
        SupprimerGroupeComponent,
        AfficherResultatsComponent,
        AjoutGrilleComponent,
        AjoutNotesComponent,
        MenuResultatsComponent,
        PrincipalResultatsComponent,
        PrincipalEvenementsComponent,
        SchedulerComponent,
        AccueilComponent,
        PrincipalGroupesComponent,
        ModificationEvenementsComponent,
        AccueilPublicationsComponent,
    ],
    imports: [
        BrowserModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatGridListModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [UtilisateurService, PublicationService, BiblioService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

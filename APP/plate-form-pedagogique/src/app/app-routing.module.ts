import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component'
import {PrincipalPublicationsComponent} from './publications/principal-publications/principal-publications.component';
import {PrincipalEvenementsComponent} from './evenement/principal-evenements/principal-evenements.component';
import {PrincipalBiblioComponent} from './biblio/principal-biblio/principal-biblio.component';
import {PrincipalResultatsComponent} from './resultats/principal-resultats/principal-resultats.component';
import {AfficherResultatsComponent} from './resultats/afficher-resultats/afficher-resultats.component';
import {GestionGrilleComponent} from './resultats/gestion-grille/gestion-grille.component';
import {AjoutNotesComponent} from './resultats/ajout-notes/ajout-notes.component';
import {ModifierEvaluationComponent} from './resultats/modifier-evaluation/modifier-evaluation.component';
import {PrincipalGroupesComponent} from './groupe/principal-groupes/principal-groupes.component';
import {RecupererMotDePasseComponent} from './utilisateurs/recuperer-mot-de-passe/recuperer-mot-de-passe.component';
import {CreerUtilisateurComponent} from './utilisateurs/creer-utilisateur/creer-utilisateur.component';
import {AjoutPublicationComponent} from './publications/ajout-publication/ajout-publication.component';
import {ModificationPublicationComponent} from './publications/modification-publication/modification-publication.component';
import {AjoutEvenementComponent} from './evenement/ajout-evenement/ajout-evenement.component';
import {ModifierMotDePasseComponent} from './utilisateurs/modifier-mot-de-passe/modifier-mot-de-passe.component';
import {ClassesComponent} from "./groupe/classes/classes.component";
import {CreerGroupeComponent} from "./groupe/creer-groupe/creer-groupe.component";
import {AfficherGroupeComponent} from "./groupe/afficher-groupe/afficher-groupe.component";
import {ModifierGroupeComponent} from "./groupe/modifier-groupe/modifier-groupe.component";
import {ConnecterUtilisateurComponent} from './utilisateurs/connecter-utilisateur/connecter-utilisateur.component';
import {AfficherungroupeComponent} from "./groupe/afficherungroupe/afficherungroupe.component"

const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'publications', component: PrincipalPublicationsComponent },
    { path: 'evenements', component: PrincipalEvenementsComponent },
    { path: 'bibliotheque', component: PrincipalBiblioComponent },
    { path: 'groupes', component : PrincipalGroupesComponent,
        children : [
            { path : 'classes', component : ClassesComponent},
            { path : 'creer-groupe', component : CreerGroupeComponent},
            { path : 'afficher-groupe', component : AfficherGroupeComponent},
            { path : 'modifier-groupe', component : ModifierGroupeComponent},
            { path : 'afficherungroupe/:id', component: AfficherungroupeComponent},
        ]
    },
/*{ path: 'groupes/classes', component : ClassesComponent},*/
    {
        path: 'resultats-scolaires', component: PrincipalResultatsComponent,
        children: [
            {path: 'modifier-evaluation', component: ModifierEvaluationComponent},
            {path: 'gestion-grille', component: GestionGrilleComponent},
            {path: 'ajout-notes', component: AjoutNotesComponent},
            {path: 'afficher-resultats', component: AfficherResultatsComponent},
        ]
    },
    { path: 'accueil', redirectTo: '', pathMatch: 'full' },
    { path: 'motdepasse-oublie', component: RecupererMotDePasseComponent },
    { path: 'utilisateurs/creer', component: CreerUtilisateurComponent },
    { path: 'utilisateurs/:utilisateurId/modifier', component: CreerUtilisateurComponent }, // Exemple: http://localhost:4200/utilisateurs/5aeb6574db8aa807b08c8602/modifier
    { path: 'publications/ajout', component: AjoutPublicationComponent},
    { path: 'publications/:id', component: ModificationPublicationComponent},
    { path: 'ajout-evenement', component: AjoutEvenementComponent },
    { path: 'motdepasse-reinitialisation/:resetPasswordToken', component: ModifierMotDePasseComponent },
    { path: 'connexion', component: ConnecterUtilisateurComponent },
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}

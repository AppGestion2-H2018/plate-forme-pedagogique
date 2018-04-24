import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component'
import {PrincipalPublicationsComponent} from './publications/principal-publications/principal-publications.component';
import {PrincipalEvenementsComponent} from './evenement/principal-evenements/principal-evenements.component';
import {PrincipalBiblioComponent} from './biblio/principal-biblio/principal-biblio.component';
import {PrincipalResultatsComponent} from './resultats/principal-resultats/principal-resultats.component';
import {PrincipalGroupesComponent} from './groupe/principal-groupes/principal-groupes.component';
import {RecupererMotDePasseComponent} from './utilisateurs/recuperer-mot-de-passe/recuperer-mot-de-passe.component';

const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'publications', component: PrincipalPublicationsComponent },
    { path: 'evenements', component: PrincipalEvenementsComponent },
    { path: 'bibliotheque', component: PrincipalBiblioComponent },
    { path: 'groupes', component: PrincipalGroupesComponent },
    { path: 'resultats-scolaires', component: PrincipalResultatsComponent },
    { path: 'accueil', redirectTo: '', pathMatch: 'full' },
    { path: 'motdepasse-oublie', component: RecupererMotDePasseComponent },
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}

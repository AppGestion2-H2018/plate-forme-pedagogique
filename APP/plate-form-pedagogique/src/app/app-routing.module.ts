import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import {PrincipalPublicationsComponent} from './publications/principal-publications/principal-publications.component';
import {PrincipalEvenementsComponent} from './evenement/principal-evenements/principal-evenements.component';
import {PrincipalBiblioComponent} from './biblio/principal-biblio/principal-biblio.component';
import {PrincipalResultatsComponent} from './resultats/principal-resultats/principal-resultats.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'publications', component: PrincipalPublicationsComponent },
    { path: 'evenements', component: PrincipalEvenementsComponent },
    { path: 'biblio', component: PrincipalBiblioComponent },
    /*{ path: 'groupes', component: PrincipalGroupesComponent }*/
    { path: 'resultats', component: PrincipalResultatsComponent },
    { path: 'home', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
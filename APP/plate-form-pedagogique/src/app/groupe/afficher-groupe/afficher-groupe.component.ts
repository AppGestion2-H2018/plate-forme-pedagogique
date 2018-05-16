import {Component, Input, OnInit} from '@angular/core';
import {Groupe} from "../groupe";
import {Classe} from "../classe";
import {Type} from "../type";
import {Programme} from "../programme";
import {Utilisateur} from '../../class/utilisateur';
import {GroupeService} from '../service/groupe.service';
import {ClasseService} from '../service/classe.service';
import {FormControl, NgForm} from "@angular/forms";
import {MatTable} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from "ngx-cookie-service";
import {UtilisateurService} from "../../service/utilisateur.service";
import {PrincipalGroupesComponent} from "../principal-groupes/principal-groupes.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-afficher-groupe',
  templateUrl: './afficher-groupe.component.html',
  styleUrls: ['./afficher-groupe.component.css'],
    providers: [GroupeService, FormsModule]
})
export class AfficherGroupeComponent extends PrincipalGroupesComponent implements OnInit {


    //Groupe
    selectedGroupe: Groupe;
    newGroupe : Groupe;
    groupes: Groupe[];

    afficherGroupe: Groupe;

    //Classe
    classes: Classe[];

    //Type
    types: Type[];

    //Programme
    programmes: Programme[];

    //Utilisateur
    utilisateurform = new FormControl(); // Permet la sélection multiple. https://stackblitz.com/angular/pbbvrgkxmjn?file=app%2Fselect-multiple-example.ts et https://stackoverflow.com/questions/43220348/cant-bind-to-formcontrol-since-it-isnt-a-known-property-of-input-angular
    @Input() utilisateur: Utilisateur;
    utilisateurs: Utilisateur[];

    displayedColumns = ['Description','actions'];
    name:any;

    constructor(protected groupeService: GroupeService, protected cookieService: CookieService,
                protected utilisateurService: UtilisateurService, protected router: Router) {
    super(cookieService, utilisateurService)
}
    // showGroupe() {
    //     this.router.navigate(['/groupes/classes']);
    // }
    getGroupeActif(){
        return this.afficherGroupe;
    };
    showGroupe(groupe: Groupe) {
        const id = groupe._id;
        this.afficherGroupe = groupe;
        console.log(this.afficherGroupe.nom);
        this.router.navigate(['/groupes/afficherungroupe/' + id]);
    }
    getGroupes(): void {
        this.groupeService.getGroupes()
            .subscribe(groupes => this.groupes = groupes);
    }

    getClasses(): void {
        this.groupeService.getClasses()
            .subscribe(classes => this.classes = classes);
    }

    getTypes(): void {
        this.groupeService.getTypes()
            .subscribe(types => this.types = types);
    }

    getProgrammes(): void {
        this.groupeService.getProgrammes()
            .subscribe(programmes => this.programmes = programmes);
    }

    getUtilisateurs(): void {
        this.groupeService.getUtilisateurs()
            .subscribe(utilisateurs => this.utilisateurs = utilisateurs);
    }

    // getClasses(): void {
    //     this.groupeService.getClasses()
    //         .subscribe(groupes => this.classes = groupes);
    // }


    onDelete(groupe: Groupe): void {
        this.groupeService.deleteGroupe(groupe)
            .subscribe(result => this.groupes= this.groupes.filter(c => c !== groupe));
    }
    onSelected(groupe: Groupe): void {
        this.selectedGroupe = groupe;
    }

    onEdit(groupeFormEdition: NgForm): void {
        if(groupeFormEdition.valid) {
            this.groupeService.updateGroupe(this.selectedGroupe)
                .subscribe(() => this.selectedGroupe = null);
        }
    }

    ngOnInit() {
        this.getGroupes();
        console.log('in ngOnInit');
        this.newGroupe = new Groupe();
        this.newGroupe.nom = '';

        this.getClasses();
        console.log('in ngOnInit');

        this.getTypes();
        console.log('in ngOnInit');

        this.getProgrammes();
        console.log('in ngOnInit');

        this.getUtilisateurs();
        console.log('in ngOnInit');

        this.getUtilisateur();
        console.log(this.selectedGroupe);

    }
  
}

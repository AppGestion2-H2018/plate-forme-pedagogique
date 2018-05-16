import {Component, Input, OnInit} from '@angular/core';
import {GroupeService} from '../service/groupe.service';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Groupe} from '../groupe';
import {Type} from '../type';
import {Programme} from '../programme';
import {Classe} from "../classe";
import {Utilisateur} from "../../class/utilisateur";
import {CookieService} from "ngx-cookie-service";
import {PrincipalGroupesComponent} from "../principal-groupes/principal-groupes.component";

@Component({
    selector: 'app-creer-groupe',
    templateUrl: './creer-groupe.component.html',
    styleUrls: ['./creer-groupe.component.css'],
    providers: [GroupeService]
})
export class CreerGroupeComponent extends PrincipalGroupesComponent implements OnInit {

    groupes: Groupe[];
    types: Type[];
    classes: Classe[];
    programmes: Programme[];
    utilisateurs: Utilisateur[];
    @Input() utilisateur: Utilisateur;
    groupe : Groupe;

    constructor(private groupeService: GroupeService, protected utilisateurService: UtilisateurService, protected cookieService : CookieService) {super(cookieService, utilisateurService)}

    getGroupes(): void {
        this.groupeService.getGroupes()
            .subscribe(groupes => this.groupes = groupes);
    }

    getTypes(): void {
        this.groupeService.getTypes()
            .subscribe(types => this.types = types);
    }

    getProgrammes(): void {
        this.groupeService.getProgrammes()
            .subscribe(programmes => this.programmes = programmes);
    }

    getClasses(): void {
        this.groupeService.getClasses()
            .subscribe(classes => this.classes = classes);
    }

    getUtilisateurs(): void{
        this.groupeService.getUtilisateurs()
            .subscribe(utilisateurs=>this.utilisateurs=utilisateurs);
    }

    addGroupe(event: any): void{
        event.preventDefault();
        this.groupeService.addGroupe(this.groupe)
            .subscribe(groupe => {
                this.groupes.push(this.groupe);
                this.groupe = new Groupe();
                this.groupe.proprietaire = "5acd550bd2d9763634a93f6f";
            })
        ;
    }

    ngOnInit() {
        console.log('in ngOnInit');
        this.groupe = new Groupe();
        this.groupe.proprietaire = "5acd550bd2d9763634a93f6f";
        this.getUtilisateurs();
        this.getGroupes();
        this.getTypes();
        this.getProgrammes();
        this.getClasses();
        this.getUtilisateur();
    }

}

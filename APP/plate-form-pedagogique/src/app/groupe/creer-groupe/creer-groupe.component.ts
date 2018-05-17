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

    /**
     * Permet de joindre la liste de tous les groupes existants, récupérée par le service, à un objet 'groupes'.
     * * @Autheur : Danny Dugas
     * */
    getGroupes(): void {
        this.groupeService.getGroupes()
            .subscribe(groupes => this.groupes = groupes);
    }

    /**
     * Permet de joindre la liste des types existants, récupérée par le service, à un objet 'types'.
     * * @Autheur : Danny Dugas
     * */
    getTypes(): void {
        this.groupeService.getTypes()
            .subscribe(types => this.types = types);
    }

    /**
     * Permet de joindre la liste de tous les programmes existants, récupérée par le service, à un objet 'programmes'.
     * * @Autheur : Danny Dugas
     * */
    getProgrammes(): void {
        this.groupeService.getProgrammes()
            .subscribe(programmes => this.programmes = programmes);
    }

    /**
     * Permet de joindre la liste de toutes les classes existantes, récupérée par le service, à un objet 'classes'.
     * * @Autheur : Danny Dugas
     * */
    getClasses(): void {
        this.groupeService.getClasses()
            .subscribe(classes => this.classes = classes);
    }

    /**
     * Permet de joindre la liste de toutes les utilisateurs existants
     * * @Autheur : Danny Dugas
     * */
    getUtilisateurs(): void{
        this.groupeService.getUtilisateurs()
            .subscribe(utilisateurs=>this.utilisateurs=utilisateurs);
    }

    /**
     * Permet d'ajouter un groupe, et remet le formulaire à blanc.
     * Définie la variable "Propriétaire" comme étant l'utilisateur connecté.
     * * @Autheur : Danny Dugas
     * */
    addGroupe(event: any): void{
        event.preventDefault();
        this.groupeService.addGroupe(this.groupe)
            .subscribe(groupe => {
                this.groupes.push(this.groupe);
                this.groupe = new Groupe();
                this.groupe.proprietaire = this.utilisateur._id;
            })
        ;
    }

    /**
     * Permet, à l'initialisation, de définir un nouvel objet 'Groupe', de lui fournir la variable propriétaire, et
     * d'aller chercher les méthodes de récupération de données, pour les affichers dans les listes du formulaire.
     * * @Autheur : Danny Dugas
     * */
    ngOnInit() {
        console.log('in ngOnInit');
        this.groupe = new Groupe();
        this.groupe.proprietaire = this.utilisateur._id;
        this.getUtilisateur();
        this.getUtilisateurs();
        this.getGroupes();
        this.getTypes();
        this.getProgrammes();
        this.getClasses();

    }

}

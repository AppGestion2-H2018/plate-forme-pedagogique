import {Component, OnInit} from '@angular/core';
import {GroupeService} from '../service/groupe.service';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Groupe} from '../groupe';
import {Type} from '../type';
import {Programme} from '../programme';
import {Classe} from "../classe";
import {Utilisateur} from "../../class/utilisateur";

@Component({
    selector: 'app-creer-groupe',
    templateUrl: './creer-groupe.component.html',
    styleUrls: ['./creer-groupe.component.css'],
    providers: [GroupeService]
})
export class CreerGroupeComponent implements OnInit {

    groupes: Groupe[];
    types: Type[];
    classes: Classe[];
    programmes: Programme[];
    utilisateurs: Utilisateur[];
    // groupe : Groupe;
    groupe = {
        _id:"",
        proprietaire:"5acd550bd2d9763634a93f6f",
        nom:"",
        actif:false,
        est_publique:false,
        description:"",
        commenter:false,
        date_fin: new Date(""),
        super_admins:[],
        admins:[],
        programmes:[],
        classes:[],
        types:[],
        utilisateurs:[],
        blacklist:[],
    }

    constructor(private groupeService: GroupeService, private utilisateurService: UtilisateurService) {}

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

    // getUtilisateurs(): void{
    //     this.utilisateurService.getUtilisateurLogin()
    //         .subscribe(utilisateurs=>this.utilisateurs=utilisateurs);
    // }

    addGroupe(event: any): void{
        event.preventDefault();
        this.groupeService.addGroupe(this.groupe)
            .subscribe();
    }


    ngOnInit() {
        console.log('in ngOnInit');
        this.getGroupes();
        this.getTypes();
        this.getProgrammes();
        this.getClasses();
        // this.getUtilisateurs();
    }

}

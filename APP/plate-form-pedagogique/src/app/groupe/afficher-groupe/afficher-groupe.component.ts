import { Component, OnInit } from '@angular/core';
import {Groupe} from "../groupe";
import {Classe} from "../classe";
import {GroupeService} from '../service/groupe.service';
import {ClasseService} from '../service/classe.service';
import {NgForm} from "@angular/forms";
import {MatTable} from "@angular/material";

@Component({
  selector: 'app-afficher-groupe',
  templateUrl: './afficher-groupe.component.html',
  styleUrls: ['./afficher-groupe.component.css'],
    providers: [GroupeService]
})
export class AfficherGroupeComponent implements OnInit {

    selectedGroupe: Groupe;
    newGroupe : Groupe;
    groupes: Groupe[];

    classes: Classe[];
    selectedClasse: Classe;
    newClasse : Classe;

    displayedColumns = ['Description','actions'];
    name:any;

    constructor(private groupeService: GroupeService) { }

    getGroupes(): void {
        this.groupeService.getGroupes()
            .subscribe(groupes => this.groupes = groupes);
    }

    getClasses(): void {
        this.groupeService.getClasses()
            .subscribe(classes => this.classes = classes);
    }

    // getClasses(): void {
    //     this.groupeService.getClasses()
    //         .subscribe(groupes => this.g = groupes);
    // }
    //

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
        this.newClasse = new Classe();
        this.newClasse.nom = '';
    }
  
}

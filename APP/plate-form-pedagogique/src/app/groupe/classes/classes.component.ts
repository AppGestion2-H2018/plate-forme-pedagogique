import {Component, Input, OnInit, Output} from '@angular/core';
import {ClasseService} from '../service/classe.service';
import {Classe} from "../classe";
import {FormControl, NgForm} from "@angular/forms";
import {MatTable} from "@angular/material";
import {Utilisateur} from "../../class/utilisateur";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
    providers: [ClasseService]
})
export class ClassesComponent implements OnInit {
    node : Node;
    selectedClasse: Classe;
    newClasse : Classe;
    classes: Classe[];
    displayedColumns = ['Description','actions'];
    name:any;
    @Input() utilisateur : Utilisateur;

    constructor(private classeService: ClasseService) {
    }

    onAdd(tableClasses: MatTable<Classe>, classeFormAjout: NgForm) {
        this.newClasse.no_groupe = "1";
        this.newClasse.debut = new Date();
        this.newClasse.fin = new Date();
        this.newClasse.fin.setDate(this.newClasse.fin.getDate() + 90);
        if(classeFormAjout.valid) {
            this.classeService.addClasse(this.newClasse)
                .subscribe(classe  => { this.classes.push(classe); classeFormAjout.resetForm(); tableClasses.renderRows();});
        }
    }
    getClasses(): void {
        this.classeService.getClasses()
            .subscribe(classes => this.classes = classes);
    }

    onDelete(classe: Classe): void {
        this.classeService.deleteClasse(classe)
            .subscribe(result => this.classes= this.classes.filter(c => c !== classe));
    }
    onSelected(classe: Classe): void {
        this.selectedClasse = classe;
    }

    onEdit(classeFormEdition: NgForm): void {
        if(classeFormEdition.valid) {
            this.classeService.updateClasse(this.selectedClasse)
                .subscribe(() => this.selectedClasse = null);
        }
    }

  ngOnInit() {
      this.getClasses();
      this.newClasse = new Classe();
      this.newClasse.nom = '';
  }

}

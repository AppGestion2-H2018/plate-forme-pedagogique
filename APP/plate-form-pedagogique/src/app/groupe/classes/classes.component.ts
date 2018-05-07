import { Component, OnInit } from '@angular/core';
import {ClasseService} from '../service/classe.service';
import {Classe} from "../classe";
import {FormControl, NgForm} from "@angular/forms";
import {MatTable} from "@angular/material";
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
    providers: [ClasseService]
})
export class ClassesComponent implements OnInit {
    selectedClasse: Classe;
    newClasse : Classe;
    classes: Classe[];
    displayedColumns = ['Description','actions'];
    name:any;
    constructor(private classeService: ClasseService) {}

    onAdd(tableClasses: MatTable<Classe>, classeFormAjout: NgForm) {
        console.log("123");
        console.log(classeFormAjout);
        console.log("456");
        this.newClasse.no_groupe = "1";
        this.newClasse.debut = new Date("2018-01-16T00:00:00.000Z");
        this.newClasse.fin = new Date("2018-04-16T00:00:00.000Z");
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
      console.log('in ngOnInit');
      this.newClasse = new Classe();
      this.newClasse.nom = '';
  }

}

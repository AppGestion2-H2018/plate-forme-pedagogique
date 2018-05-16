import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../evaluation';
import { Note } from '../note';
import { ResultatService } from '../resultat.service';

@Component({
  selector: 'app-afficher-resultats',
  templateUrl: './afficher-resultats.component.html',
  styleUrls: ['./afficher-resultats.component.css']
})
export class AfficherResultatsComponent implements OnInit {

   evaluations: Evaluation[];
   
   notes: Note[];

  constructor(private resultatService: ResultatService) { }
/*
getEvaluations(): void {
    this.resultatService.getEvaluations()
        .subscribe(evaluations => {this.evaluations = evaluations;console.log(this.evaluations);});
}

getNotes(): void {
    this.resultatService.getNotes()
        .subscribe(notes => {this.notes = notes;console.log(this.notes);});
}
*/
ngOnInit() {
  //this.getEvaluations();
  //this.getNotes();
}

}

import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../evaluation';
import { Note } from '../note';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultatService } from '../resultat.service';

@Component({
  selector: 'app-afficher-resultats',
  templateUrl: './afficher-resultats.component.html',
  styleUrls: ['./afficher-resultats.component.css']
})
export class AfficherResultatsComponent implements OnInit {

   evaluations: Evaluation[];

  constructor(private resultatService: ResultatService) { }

getEvaluations(): void {
    this.resultatService.getEvaluations(1)
        .subscribe(evaluations => {this.evaluations = evaluations;console.log(this.evaluations);});
}



supprimerEvaluation(id : number, nom: string) {

   var ans = confirm("Voulez-vous vraiment supprimer l'évaluation portant le nom " + nom + "?");
   if(ans){
     this.resultatService.supprimerEvaluation(id)
	 .subscribe(data => {this.resultatService.getEvaluations(1)},
	  error => console.log(error),
	  ()=> this.getEvaluations()
	  
	  );
   }
}

modificationEvaluation(id: number, nom: string) {
var ans = confirm("Voulez-vous vraiment modifier cette évaluation?");
   if(ans){
      this.resultatService.modificationEvaluation(id, nom)
	  .subscribe(data => {this.resultatService.getEvaluations(1)},
	  error => console.log(error),
	  ()=> this.getEvaluations()
	  
	  );
	  
	}
}

ngOnInit() {
  console.log('in ngOnInit');
  this.getEvaluations();
}
}
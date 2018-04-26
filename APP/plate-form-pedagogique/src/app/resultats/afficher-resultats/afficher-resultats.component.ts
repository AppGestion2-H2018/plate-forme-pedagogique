import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../evaluation';
import { EvaluationService } from '../evaluation.service';

@Component({
  selector: 'app-afficher-resultats',
  templateUrl: './afficher-resultats.component.html',
  styleUrls: ['./afficher-resultats.component.css']
})
export class AfficherResultatsComponent implements OnInit {

   evaluations: Evaluation[];

  constructor(private evaluationService: EvaluationService) { }

  getEvaluations(): void {
    this.evaluationService.getEvaluations()
        .subscribe(evaluations => this.evaluations = evaluations);
}

ngOnInit() {
  console.log('in ngOnInit');
  this.getEvaluations();
}


}

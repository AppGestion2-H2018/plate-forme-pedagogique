import { Component, OnInit } from '@angular/core';
import {Evenement} from '../../class/evenement';
import { EvenementService } from '../../service/evenement.service';

@Component({
  selector: 'app-liste-evenements',
  templateUrl: './liste-evenements.component.html',
  styleUrls: ['./liste-evenements.component.css'],
})
export class ListeEvenementsComponent implements OnInit {

    evenements: Evenement[];
    text: string;

    constructor(private evenementService:EvenementService) {

        this.evenementService.getEvenements()
            .subscribe(evenements => {
                this.evenements = evenements;
            });
    }

    detruireEvenement(id : string){
        var evenements = this.evenements;

        this.evenementService.detruireEvenement(id).subscribe(data => {
            //if(data.n == 1){
                for(var i = 0; i < evenements.length; i++) {
                    if(evenements[i]._id == id) {
                        evenements.splice(i, 1);
                    }
                }
            //}
        });
    }



    ngOnInit() {
  }

}

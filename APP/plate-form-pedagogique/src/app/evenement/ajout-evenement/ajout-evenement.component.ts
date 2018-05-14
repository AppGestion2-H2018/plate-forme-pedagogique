import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Event} from '../models/event';
import { EvenementService } from '../evenement.service'

import {Groupe} from '../../groupe/groupe';

@Component({
    selector: 'app-ajout-evenement',
    templateUrl: './ajout-evenement.component.html',
    styleUrls: ['./ajout-evenement.component.css']
})
export class AjoutEvenementComponent implements OnInit {

    evenementChoisi: Event;
    groupes: Groupe[];


    constructor(private evenementService: EvenementService) { }


    addEvenement(evenement: Event, evenementFormAjout: NgForm) {

        console.log(evenementFormAjout);

        if(evenementFormAjout.valid) {
            this.evenementService.addEvenement(this.evenementChoisi)
                .subscribe(
                )
        }
        else{

            console.log("problème avec la validation ?");
        }
    }


    getGroupes(): void {
        this.evenementService.getGroupes()
            .subscribe(groupes => this.groupes = groupes);
    }

    ngOnInit() {

        this.getGroupes();
        this.evenementChoisi = new Event();
    }

}

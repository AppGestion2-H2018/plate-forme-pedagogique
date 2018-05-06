import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Event} from '../models/event';
import { EvenementService } from '../../service/evenement.service'


@Component({
    selector: 'app-ajout-evenement',
    templateUrl: './ajout-evenement.component.html',
    styleUrls: ['./ajout-evenement.component.css']
})
export class AjoutEvenementComponent implements OnInit {

    evenementChoisi: Event;

    constructor(private EvenementService: EvenementService) { }

    addEvenement(evenement: Event, evenementFormAjout: NgForm) {

        if(evenementFormAjout.valid) {
            this.EvenementService.addEvenement(this.evenementChoisi)
                .subscribe(
                )
        }
        else{

            console.log("problème avec la validation ?");
        }
    }

    ngOnInit() {

        this.evenementChoisi = new Event();
    }

}

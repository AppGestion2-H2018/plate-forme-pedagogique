import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Event} from '../models/event';
import { EvenementService } from '../../service/evenement.service'

import {Groupe} from '../../groupe/groupe';
//import {GroupeService} from '../../groupe/service/groupe.service';

@Component({
    selector: 'app-ajout-evenement',
    templateUrl: './ajout-evenement.component.html',
    styleUrls: ['./ajout-evenement.component.css']
})
export class AjoutEvenementComponent implements OnInit {

    evenementChoisi: Event;
    groupes: Groupe[];

    constructor(private EvenementService: EvenementService/*, private groupeService: GroupeService*/) { }

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


    getGroupes(): void {
        this.EvenementService.getGroupes()
            .subscribe(groupes => this.groupes = groupes);
    }

    ngOnInit() {

        this.getGroupes();
        this.evenementChoisi = new Event();
    }

}

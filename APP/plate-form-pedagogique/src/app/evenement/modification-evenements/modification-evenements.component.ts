import { Component, OnInit } from '@angular/core';
import {Event} from "../models/event";
import {EvenementService} from "../evenement.service";
import {GROUPES} from "../../groupe/afficher-groupe/liste-groupe-test";


@Component({
  selector: 'app-modification-evenements',
  templateUrl: './modification-evenements.component.html',
  styleUrls: ['./modification-evenements.component.css']
})
export class ModificationEvenementsComponent implements OnInit {

  events: Event[];
  selectedEvent: Event;

  constructor(private evenementService: EvenementService) { }

    onSelect(event: Event): void {
        this.selectedEvent = event;
        console.log(this.selectedEvent);
    }
    getEvents(): void {
        this.evenementService.getEvents()
            .subscribe(events => this.events = events);
    }


    publier(){
        /*var request = document.getElementById('fichier');
        var fichier =*/
    }

    ngOnInit() {
        console.log('in ngOnInit');
        this.getEvents();
    }


}

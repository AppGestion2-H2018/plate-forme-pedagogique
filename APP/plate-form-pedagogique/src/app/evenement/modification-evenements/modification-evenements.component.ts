import { Component, OnInit } from '@angular/core';
import {Event} from "../models/event";
import {EvenementService} from "../evenement.service";
import { NgForm } from '@angular/forms';


import {GROUPES} from "../../groupe/afficher-groupe/liste-groupe-test";


@Component({
  selector: 'app-modification-evenements',
  templateUrl: './modification-evenements.component.html',
  styleUrls: ['./modification-evenements.component.css']
})
export class ModificationEvenementsComponent implements OnInit {

  events: Event[];
  selectedEvent: Event;
  displayedColumns = [ 'categorie','text','description','type','groupe', 'actions'];


  constructor(private evenementService: EvenementService) {


  }
    getEvents(): void {
        this.evenementService.getEvents()
            .subscribe(events => this.events = events);
    }

    onSelected(event: Event): void {
        this.selectedEvent = event;
    }



    onEdit(eventFormEdition: NgForm): void {
     // console.log(this.selectedEvent);

        if(eventFormEdition.valid )
        {
            console.log(event)
            this.evenementService.updateEvent(this.selectedEvent)
                .subscribe(() => this.selectedEvent = null);
        }
    }



    ngOnInit() {
        console.log('in ngOnInit');
        this.getEvents();
    }


}

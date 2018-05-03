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
  displayedColumns = ['id', 'categorie','dateDebut','dateFin','text','description','type','groupe', 'actions'];


  constructor(private evenementService: EvenementService) {

      // this.evenementService.getEvents()
      //     .subscribe(events => {
      //         this.events = events;
      //     });

  }
    getEvents(): void {
        this.evenementService.getEvents()
            .subscribe(events => this.events = events);
    }

    onSelected(event: Event): void {
        this.selectedEvent = event;
    }



    onEdit(): void {
     // console.log(this.selectedEvent);
            this.evenementService.updateEvent(this.selectedEvent)
                .subscribe(() => this.selectedEvent = null);
    }

    updateStatu(event:Event) {
        var evenement: Event = {
            _id: event._id,
            start_date: event.start_date,
            end_date: event.end_date,
            text: event.text,
            active: event.active,
            description: event.description,
            categorie: event.categorie,
            type: event.type,
            group_id: event.group_id,
            admin_id: event.admin_id
        };

    }

    // onEdit(event:Event) {
    //
    //     var evenement:Event = {
    //      _id:event._id,
    //      start_date:event.start_date,
    //      end_date:event.end_date,
    //      text:event.text,
    //      active:event.active,
    //      description:event.description,
    //      categorie:event.categorie,
    //      type:event.type,
    //      group_id:event.group_id,
    //      admin_id:event.admin_id
    //     };
    //     console.log(evenement);
    //     this.evenementService.updateEvent(this.selectedEvent)
    //                .subscribe(() => this.selectedEvent = null);
    // }



    ngOnInit() {
        console.log('in ngOnInit');
        this.getEvents();
    }


}

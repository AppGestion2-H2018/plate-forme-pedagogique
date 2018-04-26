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

    popup() {
        var popup = document.getElementById('choixTag');
        var focus = document.getElementById('texteTag').focus();
        popup.style.display = "block";
    }
    closePopup() {
        var popup = document.getElementById('choixTag');
        popup.style.display = "none";
        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }
    }
    aj
    popupGroup() {
        var popup = document.getElementById('allGroup');
        popup.style.display = "block";
    }
    closePopupGroup() {
        var popup = document.getElementById('allGroup');
        popup.style.display = "none";
        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }
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

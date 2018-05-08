/*Importation des components, du service et du modèle*/
import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";
import {EvenementService} from '../evenement.service';
import {Event} from '../models/Event';

/*Paramètres du component*/
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css'],
    providers: [EvenementService]
})

export class SchedulerComponent implements OnInit {

    /*Retourne la calendrier à la page*/
    @ViewChild("scheduler_here") schedulerContainer: ElementRef;

    constructor(private eventService: EvenementService) {
    }

    ngOnInit() {
        /*Format de la date du calendrier*/
        scheduler.config.xml_date = '%Y-%m-%d %H:%i';

        /*Date de départ lors de l'affichage du calendrier*/
        scheduler.init(this.schedulerContainer.nativeElement, new Date(2018, 4, 1));

        /*Appel lors de l'ajout d'un événement*/
        scheduler.attachEvent('onEventAdded', (id, ev) => {
            this.eventService.insert(this.serializeEvent(ev, true))
                .then((response) => {
                    if (response._id !== id) {
                        scheduler.changeEventId(id, response._id);
                    }
                });
        });

        /*Appel lors de la modification d'un événement*/
        scheduler.attachEvent('onEventChanged', (id, ev) => {
            this.eventService.update(ev);
        });

        /*Appel lors de la suppression d'un événement*/
        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            this.eventService.remove(ev._id);
        });

        /*Appel lors de l'interrogation des événement*/
        this.eventService.get()
            .then((data) => {
                scheduler.parse(data, 'json');
            });
    }

    /*Permet de conformiser les événements à la base de données avant de manipuler les informations*/
    private serializeEvent(data: any, insert: boolean = false): Event {
        const result = {};

        for (let i in data) {
            if (i.charAt(0) === '$' || i.charAt(0) === '_') {
                continue;
            }
            if (insert && i === 'id') {
                continue;
            }
            if (data[i] instanceof Date) {
                result[i] = scheduler.templates.xml_format(data[i]);
            } else {
                result[i] = data[i];
            }
        }
        return result as Event;
    }
}

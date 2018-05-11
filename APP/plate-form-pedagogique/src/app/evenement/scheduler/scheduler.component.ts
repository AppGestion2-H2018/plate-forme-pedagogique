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

    //Messages de confirmation
    private reussi: boolean = true;
    private message: string = '';
    private afficherMessage: boolean = false;
    private messageErreurEnregistrement : string = "Un problème technique nous empêche d'effectuer l'enregistrement. Veuillez réessayer plus tard.";
    private messageSuccesEnregistrement : string = "L'enregistrement a été effectué avec succès.";
    private messageErreurModification : string = "Un problème technique nous empêche d'effectuer la modification. Veuillez réessayer plus tard.";
    private messageSuccesSuppression : string = "La suppression a été effectué avec succès.";
    private messageErreurSuppression : string = "Un problème technique nous empêche d'effectuer la suppression. Veuillez réessayer plus tard.";
    private messageSuccesModification : string = "La modification a été effectuée avec succès.";
    private messageDefinitionInvalide : string = "La définition est invalide";

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
            this.afficherMessage = true;
            if (ev.text != "") {
                this.eventService.insert(this.serializeEvent(ev, true))
                    .then((response) => {
                        this.reussi = true;
                        this.message = this.messageSuccesEnregistrement;
                    }).catch((response) => {
                    this.reussi = false;
                    this.message = this.messageErreurEnregistrement;
                })
            }
            else {
                this.reussi = false;
                this.message =this.messageDefinitionInvalide;
            }
        });

        /*Appel lors de la modification d'un événement*/
        scheduler.attachEvent('onEventChanged', (id, ev) => {
            this.afficherMessage = true;
            if (ev.text != "") {
                this.eventService.update(ev).then((response) => {
                    this.reussi = true;
                    this.message = this.messageSuccesModification;
                }).catch((response) => {
                    this.reussi = false;
                    this.message = this.messageErreurModification;
                });
            }
            else {
                this.reussi = false;
                this.message = this.messageDefinitionInvalide;
            }
        });

        /*Appel lors de la suppression d'un événement*/
        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            this.afficherMessage = true;
            this.eventService.remove(ev._id).then((response) => {
                this.reussi = true;
                this.message = this.messageSuccesSuppression;
            }).catch((response) => {
                this.reussi = false;
                this.message = this.messageErreurSuppression;
            });
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

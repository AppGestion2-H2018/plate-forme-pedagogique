import {Injectable} from '@angular/core';

import {Event} from './models/event';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Groupe} from '../groupe/groupe'

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HandleError} from "./scheduler/services/service-helper";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class EvenementService {

    /*Base de donnée en ligne*/
    // private getEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';
    // private addEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements/ajout';
    // private updateEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';
    // private deleteEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';

    /*Base de données locale*/
    private getEventUrl = 'http://localhost:3000/api/evenements';
    private addEventUrl = 'http://localhost:3000/api/evenements/ajout';
    private updateEventUrl = 'http://localhost:3000/api/evenements';
    private deleteEventUrl = 'http://localhost:3000/api/evenements';

    private menusAPIUrl = 'http://localhost:3000/api/evenements';

    constructor(private http: HttpClient) {
        console.log('Event Service Initialized...');
    }


    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>('https://api-appgestion2-h18.herokuapp.com/api/evenements/');
    }

    //
    // /** PUT: mise à jour du héros */
    // updateEvent (event: Event): Observable<any> {
    //     const id = typeof event === 'string' ? event : event._id;
    //     const url = `${this.menusAPIUrl}/${id}`;   // ajouter l'id à l'URL de base
    //     return this.http.put<Event>(url, event, httpOptions);
    // }
    updateEvent(event: Event) {
        console.log(event);
        return this.http.put('https://api-appgestion2-h18.herokuapp.com/api/evenements/' + event._id, JSON.stringify(event), httpOptions);
    }

//Calendrier

    /*Retourne la collection de tous les événements au component*/
    /*Promise est un objet qui représente une valeur qui n'est pas encore disponible. Cela permet d'appeler plusieurs fonctions
     l'une après l'autre à l'aide d'un .then() et finalement de faire un .catch() pour attraper une erreur.*/
    get(): Promise<Event[]> {
        return this.http.get(this.getEventUrl)
            .toPromise()
            .catch(HandleError);
    }

    /*Insère les données d'un post dans la base de données si elles sont valides*/
    insert(event: Event): Promise<Event> {
        event.active = true;
        event.description = event.text;
        event.categorie = "1";
        event.type = "Prive";
        event.group_id = "";
        event.admin_id = "1";

        return this.http.post(this.addEventUrl, event)
            .toPromise()
            .catch(HandleError);
    }

    /*Modifie les données dans la base de données*/
    update(event: Event): Promise<void> {
        let newEvent = new Event();
        newEvent.active = event.active;
        newEvent.text = event.text;
        newEvent.categorie = event.categorie;
        newEvent.type = event.type;
        newEvent.group_id = event.group_id;
        newEvent.admin_id = event.admin_id;
        return this.http.put(`${this.updateEventUrl}/${event._id}`, newEvent)
            .toPromise()
            .catch(HandleError);
    }

    /*Supprime les données dans la base de données*/
    remove(id: number): Promise<void> {
        console.log(id);
        return this.http.delete(`${this.deleteEventUrl}/${id}`)
            .toPromise()
            .catch(HandleError);
    }

    /* Ajoute un évènement */
    addEvenement(newEvenement: Event) {
        return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/evenements/ajout', JSON.stringify(newEvenement), httpOptions);
    }

    /* va chercher les groupes à partir de l'api */
    getGroupes(): Observable<Groupe[]> {
        return this.http.get<Groupe[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/all');
    }
}

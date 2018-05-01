import { Injectable } from '@angular/core';
import { Event } from './models/event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {HandleError} from "./scheduler/services/service-helper";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class EvenementService {
    private eventsAPIUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';


    constructor(private http: HttpClient) {console.log('Event Service Initialized...');
    }


    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.eventsAPIUrl + '/events');
    }


    updateStatus(event : Event): Observable<any> {
        const id = typeof event === 'number' ? event : event._id;
        const url = `${this.eventsAPIUrl}/event/${id}`;   // ajouter l'id à l'URL de base
        return this.http.put<Event>(url, event, httpOptions);
    }
}

import { Injectable } from '@angular/core';

import { Event } from './models/event';
import { HttpClient,HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {HandleError} from "./scheduler/services/service-helper";


//https://api-appgestion2-h18.herokuapp.com/api/evenements/

// private getEventUrl = 'http://localhost:3000/api/evenements';
// private addEventUrl = 'http://localhost:3000/api/evenements/ajout';
// private updateEventUrl = 'http://localhost:3000/api/evenements';
// private deleteEventUrl = 'http://localhost:3000/api/evenements';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class EvenementService {

    private menusAPIUrl = 'http://localhost:3000/api/evenements';

    constructor(private http: HttpClient) {console.log('Event Service Initialized...');
    }


    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>('https://api-appgestion2-h18.herokuapp.com/api/evenements/');
    }

    updateEvent(event : Event) {
        console.log(event);
        return this.http.put('https://api-appgestion2-h18.herokuapp.com/api/evenements/'+ event._id , JSON.stringify(event),httpOptions);
}



}

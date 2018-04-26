import { Injectable } from '@angular/core';
import { Event } from './models/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EvenementService {

    constructor(private http: HttpClient) { }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>('https://api-appgestion2-h18.herokuapp.com/api/evenements');
    }

}

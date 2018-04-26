import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AjoutEvenementService {

    constructor(private http: HttpClient) { }

    getEvenement(): Observable<Event[]> {
        return this.http.get<Event[]>('http://localhost:3000/api/evenements');
    }

}

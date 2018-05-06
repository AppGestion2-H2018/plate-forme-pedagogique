import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Event} from '../evenement/models/event';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EvenementService {
   constructor(private http: HttpClient ) {
       console.log('Service d\'événements Initialisé...');
   }
    getEvenements(): Observable<Event[]> {
        return this.http.get<Event[]>('http://localhost:3000/API/evenements');
    }
    addEvenement(newEvenement: Event) {
        return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/evenements/ajout', JSON.stringify(newEvenement), httpOptions);
    }
    detruireEvenement(id: string) {
        return this.http.delete('http://localhost:3000/API/evenements/' + id);
    }

}

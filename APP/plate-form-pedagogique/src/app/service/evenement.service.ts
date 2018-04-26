import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Evenement} from '../class/evenement';

@Injectable()
export class EvenementService {
   constructor(private http: HttpClient ) {
       console.log('Service d\'événements Initialisé...');
   }
    getEvenements(): Observable<Evenement[]> {
        return this.http.get<Evenement[]>('http://localhost:3000/API/evenements');
    }
    /*addEvenement(newEvenement: Evenement) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/API/evenements', JSON.stringify(newEvenement), {headers : headers});
    }*/
    detruireEvenement(id: string) {
        return this.http.delete('http://localhost:3000/API/evenements/' + id);
    }

}

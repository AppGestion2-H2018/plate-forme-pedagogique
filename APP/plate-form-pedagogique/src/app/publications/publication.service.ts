import { Injectable } from '@angular/core';
import { Publication } from './publication';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {MatCardModule} from '@angular/material/card';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PublicationService {

  constructor(private http: HttpClient) { }

  getPublications(): Observable<Publication[]> {
      return this.http.get<Publication[]>('http://Localhost:3000/api/publications/');
  }

  getDateRemise(): Observable<Publication[]> {
    return this.http.get<Publication[]>('https://api-appgestion2-h18.herokuapp.com/api/publications/date-de-remise');
  }
  postPublication(auteur: number, titre: string, contenu: string, date_remise: Date, date_publication: Date, fichier: string, groupes: string[]){
      let objpost = {"auteur":auteur,"titre":titre,"contenu":contenu,"date_remise":date_remise,"date_publication":date_publication,"fichier":fichier, "groupes":groupes};
      return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/publications/ajouter', JSON.stringify(objpost), httpOptions);
  }

  deletePublication(publication: Publication): Observable<Publication> {
        const id = publication._id;
        const url = `http://Localhost:3000/api/publications/supprimer/${id}`;   // ajouter l'id à l'URL de base
        return this.http.delete<Publication>(url, httpOptions);
    }
}

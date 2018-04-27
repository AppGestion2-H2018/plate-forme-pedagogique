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
      return this.http.get<Publication[]>('https://api-appgestion2-h18.herokuapp.com/api/publications');
  }

  getDateRemise(): Observable<Publication[]> {
    return this.http.get<Publication[]>('https://api-appgestion2-h18.herokuapp.com/api/publications/date-de-remise');
  }
  postPublication(titre: string, contenu: string, date_remise: Date){
      let objpost = {"titre":titre,"contenu":contenu,"date_remise":date_remise};
      return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/publications/ajouter', JSON.stringify(objpost), httpOptions);
  }

    deletePublication(id : string){
        return this.http.get<Publication[]>('https://api-appgestion2-h18.herokuapp.com/api/publications/supprimer/' + id);
    }
}

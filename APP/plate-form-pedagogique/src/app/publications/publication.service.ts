import { Injectable } from '@angular/core';
import { Publication } from './publication';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PublicationService {

  constructor(private http: HttpClient) { }

  getPublications(): Observable<Publication[]> {
      return this.http.get<Publication[]>('https://api-appgestion2-h18.herokuapp.com/api/publications');
  }


}

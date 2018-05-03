import { Injectable } from '@angular/core';
import { Resultat } from './resultat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ResultatService {

  constructor(private http: HttpClient) { }

  getEvaluations(): Observable<Evaluation[]> {
      return this.http.get<Evaluation[]>('https://api-appgestion2-h18.herokuapp.com/api/resultats/evaluations');
  }
  
  getNotes(): Observable<Notes[]> {
      return this.http.get<Notes[]>('https://api-appgestion2-h18.herokuapp.com/api/resultats/notes');
  }

}

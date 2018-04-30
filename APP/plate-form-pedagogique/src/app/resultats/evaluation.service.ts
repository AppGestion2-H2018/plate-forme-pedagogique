import { Injectable } from '@angular/core';
import { Evaluation } from './evaluation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EvaluationService {

  constructor(private http: HttpClient) { }

  getEvaluations(): Observable<Evaluation[]> {
      return this.http.get<Evaluation[]>('https://api-appgestion2-h18.herokuapp.com/api/resultats');
  }

}

import { Injectable } from '@angular/core';
import { Utilisateur } from './class/utilisateur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UtilisateurService {

  constructor(private http:HttpClient) {
    console.log('User Service Initialized...');
  }

  getUserFromEmail(courriel: string): Observable<boolean>{
    
  }
}

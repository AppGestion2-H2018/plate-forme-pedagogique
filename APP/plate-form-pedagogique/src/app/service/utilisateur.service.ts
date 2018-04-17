import { Injectable } from '@angular/core';
import { Utilisateur } from '../class/utilisateur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UtilisateurService {

  constructor(private http:HttpClient) {
    console.log('User Service Initialized...');
  }

  sendResetPassword(){
    // return this.http.post('http://localhost:3000/api/utilisateurs/recuperation/sendmail');
    console.log('sendResetPassword');
  }
}

import { Injectable } from '@angular/core';
import { Utilisateur } from '../class/utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UtilisateurService {

  constructor(private http:HttpClient) {
    console.log('User Service Initialized...');
  }


  getUtilisateur() : Observable<Utilisateur[]> {
      return this.http.get<Utilisateur[]>('https://api-appgestion2-h18.herokuapp.com/api/utilisateurs/auth/login');
  }

  sendResetPassword(email: string){
    var objEmail = {"email" : email};
    // return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/utilisateurs/recuperation/sendmail', JSON.stringify(objEmail), httpOptions);
    return this.http.post('http://localhost:3000/api/utilisateurs/recuperation/sendmail', JSON.stringify(objEmail), httpOptions);
  }

}

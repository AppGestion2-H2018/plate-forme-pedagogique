import {Injectable} from '@angular/core';
import {Utilisateur} from '../class/utilisateur';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ReponseAPI} from '../class/reponseAPI';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UtilisateurService {

    constructor(private http: HttpClient) {
        console.log('User Service Initialized...');
    }

    /**
     * Créer un nouvel utilisateur
     *
     * TODO: Encrypter le mot de passe.
     *
     * @param {Utilisateur} utilisateur
     * @returns {Observable<Object>}
     */
    registerUtilisateur(utilisateur: Utilisateur) {
        console.log(JSON.stringify(utilisateur));
        return this.http.post('http://localhost:3000/api/utilisateurs/register/', JSON.stringify(utilisateur), httpOptions);
    }


    getUtilisateurLogin(da: number, motdepasse: number) {
        var objDa = {'da': da, 'motdepasse': motdepasse};


        return this.http.post('http://localhost:3000/api/utilisateurs/login/', JSON.stringify(objDa), httpOptions);
    }


    sendResetPassword(email: string): Observable<ReponseAPI> {
        var objEmail = {'email': email};
        // return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/utilisateurs/recuperation/sendmail', JSON.stringify(objEmail), httpOptions);
        return this.http.post<ReponseAPI>('http://localhost:3000/api/utilisateurs/recuperation/sendmail', JSON.stringify(objEmail), httpOptions);
    }

}

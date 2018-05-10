import {Injectable} from '@angular/core';
import {Utilisateur} from '../class/utilisateur';
import {HttpClient, HttpClientModule, HttpClientXsrfModule, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ReponseAPI} from '../class/reponseAPI';
import {ReponseLogin} from '../class/reponseLogin';
import {ObjectUnsubscribedError} from 'rxjs/Rx';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: false
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
    registerUtilisateur(utilisateur: Utilisateur): Observable<ReponseAPI> {
        console.log(JSON.stringify(utilisateur));
        return this.http.post<ReponseAPI>('http://api-appgestion2-h18.herokuapp.com/api/utilisateurs/register/', JSON.stringify(utilisateur), httpOptions);
    }

    getUtilisateurLogin(da: string, motdepasse: string): Observable<ReponseLogin> {

        var objDa = {'da': da, 'motdepasse': motdepasse};

        return this.http.post<ReponseLogin>('http://api-appgestion2-h18.herokuapp.com/api/utilisateurs/login/', JSON.stringify(objDa), httpOptions);
    }


    sendResetPassword(email: string): Observable<ReponseAPI> {
        var objEmail = {'email': email};
        // return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/utilisateurs/recuperation/sendmail', JSON.stringify(objEmail), httpOptions);
        return this.http.post<ReponseAPI>('http://api-appgestion2-h18.herokuapp.com/api/utilisateurs/recuperation/sendmail', JSON.stringify(objEmail), httpOptions);
    }

    validateResetPasswordToken(resetPasswordToken: string): Observable<ReponseAPI>{
      var token = {'resetPasswordToken': resetPasswordToken};
      return this.http.post<ReponseAPI>('http://api-appgestion2-h18.herokuapp.com/api/utilisateurs/recuperation/validateResetPasswordToken', JSON.stringify(token), httpOptions);
    }

    modifierMotDePasse(password: string){
      var objPassword = {'new_password' : password};
      return this.http.post<ReponseAPI>('', JSON.stringify(objPassword), httpOptions);
    }

}

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

    url = 'http://localhost:3000';
    // url = 'https://api-appgestion2-h18.herokuapp.com';

    constructor(private http: HttpClient) {

    }


    getUtilisateurLogin(da: string, motdepasse: string): Observable<ReponseLogin> {

        var objDa = {'da': da, 'motdepasse': motdepasse};

        return this.http.post<ReponseLogin>(`${this.url}/api/utilisateurs/login/`, JSON.stringify(objDa), httpOptions);
    }


    // ***************************************************************************
    // ***************** RÉCUPÉRATION DE MOT DE PASSE ****************************
    // ***************************************************************************

    /**
     * Envoie une demande de réinitialisation du mot de passe
     * Par : Mathieu Fréchette
     *
     * @param string email
     * @returns {Observable<ReponseAPI>}
     */
    sendResetPassword(email: string): Observable<ReponseAPI> {
        var objEmail = {'email': email};
        // return this.http.post<ReponseAPI>('http://localhost:3000/api/utilisateurs/recuperation/sendmail', JSON.stringify(objEmail), httpOptions);
        return this.http.post<ReponseAPI>('http://api-appgestion2-h18.herokuapp.com/api/utilisateurs/recuperation/sendmail', JSON.stringify(objEmail), httpOptions);
    }

    /**
     * Vérifie si le token de Validation est toujours valide
     * Par : Mathieu Fréchette
     *
     * @param string resetPasswordToken
     * @returns {Observable<ReponseAPI>}
     */
    validateResetPasswordToken(resetPasswordToken: string): Observable<ReponseAPI> {
        var token = {'resetPasswordToken': resetPasswordToken};
        //return this.http.post<ReponseAPI>('http://localhost:3000/api/utilisateurs/recuperation/validateResetPasswordToken', JSON.stringify(token), httpOptions);
        return this.http.post<ReponseAPI>('http://api-appgestion2-h18.herokuapp.com/api/utilisateurs/recuperation/validateResetPasswordToken', JSON.stringify(token), httpOptions);
    }

    /**
     * Modifie le mot de passe de l'usager
     * Par : Mathieu Fréchette
     *
     * @param string resetPasswordToken
     * @returns {Observable<ReponseAPI>}
     */
    modifierMotDePasse(password: string, resetPasswordToken: string): Observable<ReponseAPI> {
        var objNewPassword = {'new_password': password, 'resetPasswordToken': resetPasswordToken};
        // return this.http.post<ReponseAPI>('http://localhost:3000/api/utilisateurs/recuperation/resetPassword', JSON.stringify(objNewPassword), httpOptions);
        return this.http.post<ReponseAPI>('http://api-appgestion2-h18.herokuapp.com/api/utilisateurs/recuperation/resetPassword', JSON.stringify(objNewPassword), httpOptions);
    }


    // ***************************************************************************
    // ***************** CRÉATION ET MODIFICATION D'UTILISATEURS *****************
    // ***************************************************************************

    /**
     * Créer un nouvel utilisateur.
     *
     * TODO: Encrypter le mot de passe.
     *
     * @param {Utilisateur} utilisateur
     * @returns {Observable<Object>}
     */
    registerUtilisateur(utilisateur: Utilisateur): Observable<ReponseAPI> {
        return this.http.post<ReponseAPI>('http://localhost:3000/api/utilisateurs/register/', JSON.stringify(utilisateur), httpOptions);
    }

    /**
     * Mettre à jour un nouvel utilisateur.
     *
     * @param {Utilisateur} utilisateur
     * @returns {Observable<Object>}
     */
    updateUtilisateur(utilisateur: Utilisateur): Observable<ReponseAPI> {
        return this.http.put<ReponseAPI>('http://localhost:3000/api/utilisateurs/update/' + utilisateur._id, JSON.stringify(utilisateur), httpOptions);
    }

    /**
     * Rechercher un utilisateur.
     *
     * @param {Utilisateur} utilisateur
     * @returns {Observable<Utilisateur>}
     */
    getUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.post<Utilisateur>(`${this.url}/api/utilisateurs/getone/`, JSON.stringify(utilisateur), httpOptions);
    }

    checkEmailNotTaken(courriel: string, utilisateurId: string) {
        return this.http.post(`${this.url}/api/utilisateurs/checkEmailNotTaken/`, {
            courriel,
            utilisateurId
        });
    }
}

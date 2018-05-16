import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Groupe} from '../groupe';
import {Type} from '../type';
import {Programme} from '../programme';
import {Classe} from "../classe";
import {Utilisateur} from '../../class/utilisateur';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const httpOptions = { 
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable()

export class GroupeService {

    private groupesAPIUrl = 'https://api-appgestion2-h18.herokuapp.com/api';
	private groupesAPIUrlLocal = 'http://localhost:3000/api';
	
    constructor(private http: HttpClient) {

    }
    getGroupe(id): Observable<Groupe[]>{
        return this.http.get<Groupe[]>('http://localhost:3000/api/groupes/' + id);
    }

    getGroupes(): Observable<Groupe[]> {
        return this.http.get<Groupe[]>('http://localhost:3000/api/groupes/all');
        // return this.http.get<Groupe[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/all');
    }

    getTypes(): Observable<Type[]> {
        return this.http.get<Type[]>('http://localhost:3000/api/groupes/types/all');
        // return this.http.get<Type[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/types/all');
    }

    getProgrammes(): Observable<Programme[]> {
        return this.http.get<Programme[]>('http://localhost:3000/api/groupes/programmes/all');
        // return this.http.get<Programme[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/programmes/all');
    }

    getClasses(): Observable<Classe[]> {
        return this.http.get<Classe[]>('http://localhost:3000/api/groupes/classes/all/');
        // return this.http.get<Classe[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/classes/all/');
    }

    addGroupe(newGroupe: Groupe) {
        return this.http.post('http://localhost:3000/api/groupes/', JSON.stringify(newGroupe), httpOptions);
        // return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/groupes/', JSON.stringify(newGroupe), httpOptions);
    }

    deleteGroupe(groupe : Groupe): Observable<Groupe> {
        const id = groupe._id;
        const url = 'http://localhost:3000/api/groupes/delete/' + id;
        // const url = 'https://api-appgestion2-h18.herokuapp.com/api/groupes/delete/' + id;
        return this.http.delete<Groupe>(url, httpOptions);
    }

    /** UPDATE: modification de un groupe **/
    updateGroupe(groupe : Groupe): Observable<any> {
        return this.http.put<Classe>("http://localhost:3000/api/groupes", groupe, httpOptions);
        // return this.http.put<Classe>("https://api-appgestion2-h18.herokuapp.com/api/groupes", groupe, httpOptions);
    }

    /**Obtenir tous les Utilisateurs **/
    getUtilisateurs(): Observable<Utilisateur[]> {
        return this.http.get<Utilisateur[]>('http://localhost:3000/api/utilisateurs/auth/all');
        // return this.http.get<Utilisateur[]>('http://api-appgestion2-h18.herokuapp.com/api/utilisateurs/auth/all');
    }



}


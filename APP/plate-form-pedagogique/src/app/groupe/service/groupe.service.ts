import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Groupe} from '../groupe';
import {Type} from '../type';
import {Programme} from '../programme';
import {Classe} from "../classe";

const httpOptions = { 
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()

export class GroupeService {
	
	private groupesAPIUrl = 'https://api-appgestion2-h18.herokuapp.com/api';
	private groupesAPIUrlLocal = 'http://localhost:3000/api';
	
    constructor(private http: HttpClient) {

    }

    getGroupes(): Observable<Groupe[]> {
        return this.http.get<Groupe[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/all');
    }

    getTypes(): Observable<Type[]> {
        return this.http.get<Type[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/types/all');
    }

    getProgrammes(): Observable<Programme[]> {
        return this.http.get<Programme[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/programmes/all');
    }

    getClasses(): Observable<Classe[]> {
        return this.http.get<Classe[]>('https://api-appgestion2-h18.herokuapp.com/api/groupes/classes/all');
    }

    addGroupe(newGroupe: Groupe) {
        return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/groupes/', JSON.stringify(newGroupe), httpOptions);
    }

    deleteGroupe(groupe : Groupe): Observable<Groupe> {
        const id = groupe._id;
        const url = 'https://api-appgestion2-h18.herokuapp.com/api/groupes/delete/' + id;
        return this.http.delete<Groupe>(url, httpOptions);
    }

    /** UPDATE: modification de un groupe **/
    updateGroupe(groupe : Groupe) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('https://api-appgestion2-h18.herokuapp.com/api/groupes/'+ groupe._id , JSON.stringify(groupe), httpOptions);
    }
}


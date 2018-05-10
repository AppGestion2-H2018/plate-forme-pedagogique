import { Injectable } from '@angular/core';
import { Biblio} from "../class/biblio";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Tablette} from "../class/tablette";
import { of } from 'rxjs/observable/of';
import {ReponseAPI} from "../class/reponseAPI";
import {Utilisateur} from "../class/utilisateur";

const httpOptions = {headers: new HttpHeaders({ 'Content-type': 'application/json'})};

@Injectable()
export class BiblioService {

    //'https://api-appgestion2-h18.herokuapp.com/api/bibliotheque'
    //'http://localhost:3000/api/bibliotheque'
    private biblioAPIurl= 'http://api-appgestion2-h18.herokuapp.com/api/bibliotheque';

    constructor(private http: HttpClient) { }

    getLivres(url: string): Observable<Biblio> {
        return this.http.get<Biblio>(url);
    }

    getTablette(): Observable<Tablette[]> {
        return this.http.get<Tablette[]>(this.biblioAPIurl);
    }

    postTablette(tablette: Tablette): Observable<Tablette> {
        console.log(JSON.stringify(tablette));
        return this.http.post<Tablette>(this.biblioAPIurl + '/ajouter', tablette, httpOptions);
    }

    putTablette(tablette: Tablette): Observable<Tablette> {
        console.log(JSON.stringify(tablette));
        return this.http.post<Tablette>(this.biblioAPIurl + '/ajouter', tablette, httpOptions);
    }

}


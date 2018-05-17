import { Injectable } from '@angular/core';
import { Biblio} from "../class/biblio";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Tablette} from "../class/tablette";
import { of } from 'rxjs/observable/of';
import {ReponseAPI} from "../class/reponseAPI";
import {Utilisateur} from "../class/utilisateur";
import {Livre} from "../class/livre";

const httpOptions = {headers: new HttpHeaders({ 'Content-type': 'application/json'})};

@Injectable()
export class BiblioService {

    //Changer au besoin:
    private biblioAPIurl= 'https://api-appgestion2-h18.herokuapp.com/api/bibliotheque';
    //private biblioAPIurl= 'http://localhost:3000/api/bibliotheque';

    constructor(private http: HttpClient) { }

    //Donne tous les livres d'une tablette
    getLivres(url: string): Observable<Biblio> {
        return this.http.get<Biblio>(url);
    }

    //donne toues les tablettes
    getTablette(): Observable<Tablette[]> {
        return this.http.get<Tablette[]>(this.biblioAPIurl);
    }

    //Ajouter
    postTablette(tablette: Tablette): Observable<Tablette> {
        console.log(JSON.stringify(tablette));
        return this.http.post<Tablette>(this.biblioAPIurl + '/ajouter', tablette, httpOptions);
    }

    //Modifier (Ajoute un livre à une tablette)
    putTablette (tablette: Tablette): Observable<Tablette> {
        const id = tablette._id;
        const url = `${this.biblioAPIurl}/tablette/${id}`;   // ajouter l'id à l'URL de base
        return this.http.put<Tablette>(url, tablette, httpOptions);
    }
}


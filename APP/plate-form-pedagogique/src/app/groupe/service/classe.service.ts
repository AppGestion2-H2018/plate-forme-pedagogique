import { Injectable } from '@angular/core';
import { Classe } from '../classe';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Response} from '@angular/http';

@Injectable()
export class ProduitService {
    private readonly URL = 'https://produits-a-commander.herokuapp.com/api/produit';

    constructor(private httpClient: HttpClient) {
    }

    getClasses(): Observable<Classe[]> {
        return this.httpClient.get<Classe[]>('https://produits-a-commander.herokuapp.com/api/produits');
    }

    public insertProduit(produit: Produit) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = JSON.stringify(produit);
        return this.httpClient.post(this.URL, body, {headers: headers});
    }

    public updateProduit(produit: Produit): Observable<Produit> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = JSON.stringify(produit);
        return this.httpClient.put<Produit>(this.URL, body, {headers: headers});
    }

}

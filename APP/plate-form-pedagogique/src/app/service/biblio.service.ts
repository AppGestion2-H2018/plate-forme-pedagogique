import { Injectable } from '@angular/core';
import { Biblio} from "../class/biblio";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BiblioService {

    constructor(private http: HttpClient) { }

    getLivres(url: string): Observable<Biblio> {
        return this.http.get<Biblio>(url);
    }
}


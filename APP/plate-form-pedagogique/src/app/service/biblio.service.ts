import { Injectable } from '@angular/core';
import { Livre } from '../biblio/livre';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BiblioService {

    constructor(private http: HttpClient) { }

    getLivres(): Observable<Object> {
        return this.http.get('https://www.googleapis.com/books/v1/volumes?q=search+albert');
    }
}


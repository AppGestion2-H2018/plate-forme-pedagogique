import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Groupe} from '../groupe';


@Injectable()
export class GroupeService{
   constructor(private http: HttpClient){}
   getGroupes(): Observable<Groupe[]> {
		return this.http.get<Groupe[]>('https://api-appgestion2-h18.herokuapp.com/api/groupe');
	}
//	addGroupe(newGroupe: Groupe) {
  //var headers = new Headers();
  //headers.append('Content-Type', 'application/json');
  //return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/groupe/creer-groupe', JSON.stringify(newGroupe), {headers : headers});
//}


}

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Groupe} from '../groupe';
import {Type} from '../type';
import {Programme} from '../programme';

var headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()

export class GroupeService {
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

    addGroupe(newGroupe: Groupe) {
        return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/groupe/creer-groupe', JSON.stringify(newGroupe), {headers: headers});
    }

//	deleteGroupe(id : string){
//		var groupes = this.groupes;

//		this.groupeService.deleteGroupe(id).subscribe(date => {
//			if(data.n == 1){
//				for(var i = 0; i < groupes.length; i++;) {
//					if(groupes[i]._id == id) {
//						groupes.splice(i,1);
//					}
//				}
//			}
//		}

//	}
// export class GroupeService{
//    constructor(private http: HttpClient){}
//    getGroupes(): Observable<Groupe[]> {
// 		return this.http.get<Groupe[]>('https://api-appgestion2-h18.herokuapp.com/api/groupe/all');
// 	}
// 	addGroupe(newGroupe: Groupe) {
//   //var headers = new Headers();
//   //headers.append('Content-Type', 'application/json');
//   //return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/groupe/creer-groupe', JSON.stringify(newGroupe), {headers : headers});
// }
// 	getGroupe(id : string){
// //		const url = 'https://api-appgestion2-h18.herokuapp.com/api/groupe/${id}';
// //		return this.http.get<Groupe>(url).pipe(
// //			tap(_ => this.log('fetched groupe id=${id}')),
// //			catchError(this.handleError<Groupe>('getGroupe id=${id}'))
// //		);
// 	}
	deleteGroupe(id : string){
		return this.http.get<Groupe[]>('https://api-appgestion2-h18.herokuapp.com/api/groupe/' + id);
	}
}


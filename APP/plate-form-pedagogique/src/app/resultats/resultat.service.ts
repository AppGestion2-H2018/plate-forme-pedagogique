import {Injectable} from '@angular/core';
import {Evaluation} from './evaluation';
import {Grilleevaluation} from './grilleevaluation';
import {Cours} from './cours';
import {Note} from './note';
import {Enseignant} from './enseignant';
import {Groupe} from "./groupe.";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ResultatService {

    constructor(private http: HttpClient) {
    }

    getEvaluations(grilleevaluation_id: number): Observable<Evaluation[]> {
        return this.http.get<Evaluation[]>('https://api-appgestion2-h18.herokuapp.com/api/resultats/evaluations/' + grilleevaluation_id);
        //return this.http.get<Evaluation[]>('http://localhost:3000/api/resultats/evaluations/' + grilleevaluation_id);
    }

    getGrilleevaluations(id_enseignant: number, id_cours: number, id_groupe: number): Observable<Grilleevaluation> {
        return this.http.get<Grilleevaluation>('https://api-appgestion2-h18.herokuapp.com/api/resultats/grilleevaluation/' + id_enseignant + '/' + id_cours + '/' + id_groupe);
        //return this.http.get<Grilleevaluation>('http://localhost:3000/api/resultats/grilleevaluation/' + id_enseignant + '/' + id_cours + '/' + id_groupe);
    }

    getCours(id: number): Observable<Cours[]> {
        return this.http.get<Cours[]>('https://api-appgestion2-h18.herokuapp.com/api/resultats/cours/' + id);
        //return this.http.get<Cours[]>('http://localhost:3000/api/resultats/cours/' + id);
    }

    getGroupe(id: number): Observable<Groupe[]> {
        return this.http.get<Groupe[]>('https://api-appgestion2-h18.herokuapp.com/api/resultats/groupe/' + id);
        //return this.http.get<Groupe[]>('http://localhost:3000/api/resultats/groupe/' + id);
    }

    getEnseignant(id: number): Observable<Enseignant> {
        return this.http.get<Enseignant>('https://api-appgestion2-h18.herokuapp.com/api/resultats/enseignant/' + id);
        //return this.http.get<Enseignant>('localhost:3000/api/resultats/enseignant/' + id);
    }

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>('https://api-appgestion2-h18.herokuapp.com/api/resultats/notes/');
        //return this.http.get<Note[]>('localhost:3000/api/resultats/notes/');
    }

    //Modification d'une grille d'évaluation
    //ToDo~Test
    modifierGrilleevaluation(id: number) {

    }

    //Suppression d'une d'évaluation
    //Todo~Code
    deleteGrilleevaluation(evaluation_id: number) {

    }

    //Ajout d'une d'évaluation
    //Todo~Code
    ajoutEvaluation(cours_id:number, groupe_id:number) {

    }

    //Ajout d'une grille d'évaluation
    //Todo~Code
    ajoutGrilleevaluation(enseignant_id:number,cours_id:number, groupe_id:number) {
        return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/resultats/grilleevaluation/ajouter/' + enseignant_id + "/" + cours_id + "/" + groupe_id, null);
        //return this.http.post('http://localhost:3000/api/resultats/grilleevaluation/ajouter/' + enseignant_id + "/" + cours_id + "/" + groupe_id, null);
    }

    supprimerEvaluation(id: number) {
        return this.http.get<Note[]>('https://api-appgestion2-h18.herokuapp.com/api/resultats/evaluations/' + id);
        //return this.http.delete<Evaluation>('http://localhost:3000/api/resultats/evaluations/' + id);
    }

}

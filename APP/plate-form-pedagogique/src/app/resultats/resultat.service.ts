import {Injectable} from '@angular/core';
import {Evaluation} from './evaluation';
import {Grilleevaluation} from './grilleevaluation';
import {Cours} from './cours';
import {Note} from './note';
import {Enseignant} from './enseignant';
import {Groupe} from "./groupe.";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ResultatService {

    url = 'https://api-appgestion2-h18.herokuapp.com/api/resultats/';
    //url = 'http://localhost:3000/api/resultats/';

    constructor(private http: HttpClient) {
    }

    getEvaluations(grilleevaluation_id: number): Observable<Evaluation[]> {
        return this.http.get<Evaluation[]>(this.url + 'evaluations/' + grilleevaluation_id);
    }

    getGrilleevaluations(id_enseignant: number, id_cours: number, id_groupe: number): Observable<Grilleevaluation> {
        return this.http.get<Grilleevaluation>(this.url + 'grilleevaluation/' + id_enseignant + '/' + id_cours + '/' + id_groupe);
    }

    getCours(id: number): Observable<Cours[]> {
        return this.http.get<Cours[]>(this.url + 'cours/' + id);
    }

    getGroupe(id: number): Observable<Groupe[]> {
        return this.http.get<Groupe[]>(this.url + 'groupe/' + id);
    }

    getEnseignant(id: number): Observable<Enseignant> {
        return this.http.get<Enseignant>(this.url + 'enseignant/' + id);
    }

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(this.url + 'notes/');
    }

    //Ajout d'une grille d'évaluation
    ajoutGrilleevaluation(enseignant_id:number,cours_id:number, groupe_id:number) {
        return this.http.post(this.url + 'grilleevaluation/ajouter/' + enseignant_id + "/" + cours_id + "/" + groupe_id, null);
    }

    //Suppression d'une évaluation
    supprimerEvaluation(id: number) {
        return this.http.delete<Evaluation>(this.url + 'evaluations/' + id);
    }

    //Ajout d'une d'évaluation
    //Todo~Get the body
    ajouterEvaluation(evaluation:Evaluation) {
        return this.http.post<Evaluation>(this.url + 'evaluations/' + evaluation.grilleevaluation_id + '/' + evaluation.nom + '/' + evaluation.commentaire + '/' + evaluation.categorie_id + '/' + evaluation.poids_evaluation, null);
    }

    //Modification d'une d'évaluation
    //Todo~Get the body
    modifierEvaluation(evaluation:Evaluation) {
        return this.http.put(this.url + 'evaluations/modifier/' + evaluation.id + '/' + "Modifier!", null);
    }

}

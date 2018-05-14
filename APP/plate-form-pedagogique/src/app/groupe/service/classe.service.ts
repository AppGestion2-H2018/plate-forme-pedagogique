import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Classe} from "../classe";
import {Observable} from "rxjs/Observable";


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/**
 * Classe du service pour les classes
 */
@Injectable()
export class ClasseService {
    private dev = false;
    private url;

    /**
     * Constructeur du service d'appel à L'API pour les opérations CRUD
     * @author Jean-Sébastien Lemelin
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {
        if(this.dev){
            this.url = 'http://localhost:3000/api/groupes/classes';
        }else{
            this.url = 'https://api-appgestion2-h18.herokuapp.com/api/groupes/classes';
        }
    }

    /**
     * Lister les classes
     * @returns {Observable<Classe[]>} Un tableau des classes
     */
   /* getClasses(): Observable<Classe[]> {
        return this.http.get<Classe[]>(this.url + 'all');
    }*/
    getClasses(): Observable<Classe[]> {
        return this.http.get<Classe[]>(`${this.url}/all/`);
    }

    /**
     * Ajouter une classe
     * @param {Classe} newClasse L'élément passé en paramètres
     * @returns {Observable<Object>} Un message de succès ou un message d'erreur
     */
    /** POST: ajout d'un héros */
    addClasse (classe: Classe): Observable<Classe> {
        return this.http.post<Classe>(this.url, classe, httpOptions);
    }

    /**
     * Efface une classe
     * @param {Classe} classe Le id de l
     * @returns {Observable<Object>} Un message de succès ou d'erreur
     */
    deleteClasse(classe:Classe){
        const id = typeof classe === 'number' ? classe : classe._id;
        const url = `${this.url}/delete/${id}`;
        console.log(url);
        return this.http.delete<Classe>(url, httpOptions);
    }

    /** PUT: mise à jour du classes */
    updateClasse (classe: Classe): Observable<any> {
        //const id = typeof classe === 'number' ? classe : classe._id;
        const url = this.url;
        return this.http.put<Classe>(url, classe, httpOptions);
    }

    /**
     * Modifier un objet classe
     * @param {Classe} classe L'objet classe
     * @returns {Observable<Object>} Un message de succès ou d'erreur
     */
    putClasse(classe : Classe){
        const id = typeof classe === 'number' ? classe : classe._id;
        const url = `${this.url}/${id}`;
        return this.http.put<Classe>(url, httpOptions);
    }
}

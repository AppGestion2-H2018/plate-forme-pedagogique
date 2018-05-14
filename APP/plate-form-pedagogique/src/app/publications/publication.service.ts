import { Injectable } from '@angular/core';
import { Publication } from './publication';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {MatCardModule} from '@angular/material/card';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PublicationService {

  constructor(private http: HttpClient) { }

  private ajoutCommentaireUrl = 'http://localhost:3000/api/publications/';

  getPublications(): Observable<Publication[]> {
      //return this.http.get<Publication[]>('https://api-appgestion2-h18.herokuapp.com/api/publications/');
      return this.http.get<Publication[]>('http://localhost:3000/api/publications/');
  }

  getDateRemise(): Observable<Publication[]> {
    return this.http.get<Publication[]>('https://api-appgestion2-h18.herokuapp.com/api/publications/date-de-remise');
  }
  postPublication(publication: Publication){
      //let objpost = {"_id":null, "auteur":auteur,"titre":titre,"contenu":contenu,"date_remise":date_remise,"date_publication":date_publication,"fichier":fichier, "groupes":groupes};
      return this.http.post('https://api-appgestion2-h18.herokuapp.com/api/publications/ajouter', JSON.stringify(publication), httpOptions);
  }

  deletePublication(publication: Publication): Observable<Publication> {
        const id = publication._id;
        const url = `https://api-appgestion2-h18.herokuapp.com/api/publications/supprimer/${id}`;   // ajouter l'id à l'URL de base
        return this.http.delete<Publication>(url, httpOptions);
    }
    getTags(tag: String): Observable<Publication[]> {
        return this.http.get<Publication[]>(`https://api-appgestion2-h18.herokuapp.com/api/publications/tag/${tag}`);
    }

      ajoutCommentaire(publication: Publication) {
        const id = publication._id;
        let newPublication = new Publication();
        newPublication.titre = publication.titre,
        newPublication.auteur = publication.auteur,
        newPublication.groupes = publication.groupes,
        newPublication.date_publication = publication.date_publication,
        newPublication.date_remise = publication.date_remise,
        newPublication.contenu = publication.contenu,
        newPublication.tags = publication.tags,
        newPublication.fichier = publication.fichier,
        newPublication.commentaire = publication.commentaire

        return this.http.put(`http://localhost:3000/api/publications/${id}`, JSON.stringify(newPublication), httpOptions);
    }
}

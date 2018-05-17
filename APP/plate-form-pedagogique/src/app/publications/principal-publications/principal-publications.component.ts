import { Component, OnInit } from '@angular/core';
import { Publication } from '../publication';
import { PublicationService } from '../publication.service';
import { FormControl } from '@angular/forms'
import {Observable} from 'rxjs/Observable';
import { catchError, map, tap,startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';

@Component({
  selector: 'app-principal-publications',
  templateUrl: './principal-publications.component.html',
  styleUrls: ['./principal-publications.component.css']
})
export class PrincipalPublicationsComponent implements OnInit {

  publications: Publication[];
  publication: Publication;
  myControl = new FormControl();
  commentaire: string;
  tags: String[];

  filteredOptions: Observable<any[]>;

  constructor(private publicationService: PublicationService) { }

  getPublications(): void {
    this.publicationService.getPublications()
        .subscribe(publications => this.publications = publications);
}

getDateRemise(): void {
  this.publicationService.getDateRemise()
      .subscribe(publications => this.publications = publications);
}

    deletePublication(publication: Publication): void {
        this.publicationService.deletePublication(publication)
            .subscribe(result => this.publications = this.publications.filter(h => h !== publication));
    }

    getPublicationsParTags(tag: String): void {
        this.publicationService.getPublicationsParTags(tag)
            .subscribe(publications => this.publications = publications);
    }

    getTags(): void {
        this.publicationService.getTags()
            .subscribe(tags => this.tags = tags);
    }

    // Ne fonctionne pas
    ajoutCommentaires(publication: Publication){
        this.publication = publication;
        this.publication.commentaire.push(this.commentaire);
    }

    ajoutCommentaire(publication: Publication) {
        var _publication:Publication = {
            _id:publication._id,
            titre:publication.titre,
            auteur:publication.auteur,
            groupes:publication.groupes,
            date_publication:publication.date_publication,
            date_remise:publication.date_remise,
            contenu:publication.contenu,
            tags:publication.tags,
            fichier:publication.fichier,
            commentaire:publication.commentaire
        };

        this.publicationService.ajoutCommentaire(_publication).subscribe(data => {
            publication.titre,
            publication.auteur,
            publication.groupes,
            publication.date_publication,
            publication.date_remise,
            publication.contenu,
            publication.tags,
            publication.fichier,
            publication.commentaire
        })
     }

ngOnInit() {
  console.log('in ngOnInit');
  this.getPublications();
  this.getTags();
  this.commentaire = "";
  }
}


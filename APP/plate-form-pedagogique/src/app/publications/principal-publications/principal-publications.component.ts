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
  myControl = new FormControl();

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
    getTags(tag: String): void {
        this.publicationService.getTags(tag)
            .subscribe(publications => this.publications = publications);
    }

    ajoutCommentaire(publication: Publication): void {
        this.publicationService.ajoutCommentaire(publication).subscribe(data => {
            publication._id,
            publication.titre,
            publication.auteur,
            publication.groupes,
            publication.date_publication,
            publication.date_remise,
            publication.contenu,
            publication.tags,
            publication.fichier,
            publication.commentaire
          });
     
        }

ngOnInit() {
  console.log('in ngOnInit');
  this.getPublications();
  }
}


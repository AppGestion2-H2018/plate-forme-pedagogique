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

ngOnInit() {
  console.log('in ngOnInit');
  this.getPublications();
  }
}


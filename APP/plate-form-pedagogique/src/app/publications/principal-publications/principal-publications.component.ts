import { Component, OnInit } from '@angular/core';
import { Publication } from '../publication';
import { PublicationService } from '../publication.service';

@Component({
  selector: 'app-principal-publications',
  templateUrl: './principal-publications.component.html',
  styleUrls: ['./principal-publications.component.css']
})
export class PrincipalPublicationsComponent implements OnInit {

  publications: Publication[];

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

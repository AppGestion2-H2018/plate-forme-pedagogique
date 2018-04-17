import { Component, OnInit } from '@angular/core';
import { Livre } from './livre';
import { BiblioService } from '../service/biblio.service';
import {Biblio} from "./biblio";

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.css']
})
export class BiblioComponent implements OnInit {

  biblio: Biblio;
  selectedLivre: Livre;

  constructor(private biblioService: BiblioService) { }

  onSelect(livre: Livre): void {
    this.selectedLivre = livre;
    console.log(this.selectedLivre);
  }

  getLivres(): void {
    this.biblioService.getLivres()
        .subscribe(resultat => this.biblio = resultat);
      console.log('in ngOnInit');
    }

    ngOnInit() {
        console.log('in ngOnInit');
        this.getLivres();
    }
}

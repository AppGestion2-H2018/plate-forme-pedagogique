import { Component, OnInit } from '@angular/core';
import { Livre } from './livre';
import { BiblioService } from '../service/biblio.service';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.css']
})
export class BiblioComponent implements OnInit {

  livres: Livre[];
  selectedLivre: Livre;

  constructor(private biblioService: BiblioService) { }

  onSelect(livre: Livre): void {
    this.selectedLivre = livre;
    console.log(this.selectedLivre);
  }

  getLivres(): void {
    this.biblioService.getLivres()
        .subscribe(livres => this.livres = livres.items);
      console.log('in ngOnInit');
    }

    ngOnInit() {
        console.log('in ngOnInit');
        this.getLivres();
    }
}

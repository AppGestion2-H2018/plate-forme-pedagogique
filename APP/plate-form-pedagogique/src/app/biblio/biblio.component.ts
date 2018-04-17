import { Component, OnInit } from '@angular/core';
import { Livre } from './livre';
import { LIVRES } from './mock-livres';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.css']
})
export class BiblioComponent implements OnInit {
  livres = LIVRES;
  selectedLivre: Livre;

  constructor() { }

  onSelect(livre: Livre): void {
    this.selectedLivre = livre;
    console.log(this.selectedLivre)
  }

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import {BiblioService} from "../../service/biblio.service";
import {Livre} from "../../class/livre";
import {Biblio} from "../../class/biblio";

@Component({
  selector: 'app-biblio-liste',
  templateUrl: './biblio-liste.component.html',
  styleUrls: ['./biblio-liste.component.css']
})
export class BiblioListeComponent implements OnInit {

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

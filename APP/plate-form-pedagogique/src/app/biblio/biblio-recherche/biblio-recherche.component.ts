import { Component, OnInit } from '@angular/core';
import {Biblio} from "../../class/biblio";
import {BiblioService} from "../../service/biblio.service";
import {Livre} from "../../class/livre";

@Component({
  selector: 'app-biblio-recherche',
  templateUrl: './biblio-recherche.component.html',
  styleUrls: ['./biblio-recherche.component.css']
})
export class BiblioRechercheComponent implements OnInit {

    biblio: Biblio;
    selectedLivre: Livre;
    recherche: string;

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

import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {BiblioService} from "../../service/biblio.service";
import {Livre} from "../../class/livre";
import {Biblio} from "../../class/biblio";

@Component({
  selector: 'app-biblio-liste',
  templateUrl: './biblio-liste.component.html',
  styleUrls: ['./biblio-liste.component.css']
})
export class BiblioListeComponent implements OnInit, OnChanges {

    biblio: Biblio;
    selectedLivreParent: Livre;
    @Input() rechercheEnfant: string;

    tiles = [
        {cols: 1, rows: 2},
        {cols: 1, rows: 1},
        {cols: 1, rows: 1},
    ];

    constructor(private biblioService: BiblioService) { }

    onSelect(livre: Livre): void {
        this.selectedLivreParent = livre;
        console.log(this.selectedLivreParent);
    }

    getLivres(recherche: string): void {
        this.biblioService.getLivres('https://www.googleapis.com/books/v1/volumes?q=' + recherche)
            .subscribe(resultat => this.biblio = resultat);
        console.log('in ngOnInit');
    }

    ngOnInit() {
        console.log('in ngOnInit');
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getLivres(changes.rechercheEnfant.currentValue);
    }
}

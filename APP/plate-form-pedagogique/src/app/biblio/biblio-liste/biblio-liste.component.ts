import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
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
    selectedLivre: Livre;
    @Input() recherche: string;

    constructor(private biblioService: BiblioService) { }

    onSelect(livre: Livre): void {
        this.selectedLivre = livre;
        console.log(this.selectedLivre);
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
        this.getLivres(changes.recherche.currentValue);
    }
}

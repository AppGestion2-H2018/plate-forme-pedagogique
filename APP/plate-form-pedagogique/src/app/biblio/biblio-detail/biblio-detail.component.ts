import { Component, OnInit } from '@angular/core';
import {Livre} from "../../class/livre";
import {BiblioService} from "../../service/biblio.service";
import {Biblio} from "../../class/biblio";

@Component({
  selector: 'app-biblio-detail',
  templateUrl: './biblio-detail.component.html',
  styleUrls: ['./biblio-detail.component.css']
})
export class BiblioDetailComponent implements OnInit {

    biblio: Biblio;
    selectedLivre: Livre;

    constructor(private biblioService: BiblioService) { }


    getLivres(): void {
        this.biblioService.getLivres('https://www.googleapis.com/books/v1/volumes?q=Albert')
            .subscribe(resultat => this.biblio = resultat);
        console.log('in ngOnInit');
    }

    ngOnInit() {
        console.log('in ngOnInit');
        this.getLivres();
    }
}

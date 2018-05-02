import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Livre} from "../../class/livre";
import {BiblioService} from "../../service/biblio.service";
import {Tablette} from "../../class/tablette";

@Component({
  selector: 'app-biblio-recherche',
  templateUrl: './biblio-recherche.component.html',
  styleUrls: ['./biblio-recherche.component.css']
})
export class BiblioRechercheComponent implements OnInit {

    rechercheData: string;
    selectedData: Livre;
    tablettesData: Tablette[];



    constructor(private biblioService: BiblioService) { }

    ngOnInit() {
        this.getTablette();
        console.log('in ngOnInit');
    }

    inSelectedLivre(event){
        this.selectedData = event;
    }

    getTablette(): void {
        this.biblioService.getTablette()
            .subscribe(resultat => this.tablettesData = resultat);
        console.log('in ngOnInit');
    }
}

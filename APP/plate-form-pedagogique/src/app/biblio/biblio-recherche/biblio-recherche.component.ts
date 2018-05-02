import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Livre} from "../../class/livre";

@Component({
  selector: 'app-biblio-recherche',
  templateUrl: './biblio-recherche.component.html',
  styleUrls: ['./biblio-recherche.component.css']
})
export class BiblioRechercheComponent implements OnInit {

    rechercheData: string;
    selectedData: Livre;

    constructor() { }

    ngOnInit() {
        console.log('in ngOnInit');
    }

    inSelectedLivre(event){
        this.selectedData = event;
    }
}

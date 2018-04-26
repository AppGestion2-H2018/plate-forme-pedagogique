import {Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import {Biblio} from "../../class/biblio";
import {BiblioService} from "../../service/biblio.service";
import {Livre} from "../../class/livre";

@Component({
  selector: 'app-biblio-recherche',
  templateUrl: './biblio-recherche.component.html',
  styleUrls: ['./biblio-recherche.component.css']
})
export class BiblioRechercheComponent implements OnInit {

    rechercheParent: string;

    constructor() { }

    ngOnInit() {
        console.log('in ngOnInit');
    }
}

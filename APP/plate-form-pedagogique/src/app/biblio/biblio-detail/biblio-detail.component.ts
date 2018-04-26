import {Component, Input, OnInit} from '@angular/core';
import {BiblioService} from "../../service/biblio.service";
import {Livre} from "../../class/livre";

@Component({
  selector: 'app-biblio-detail',
  templateUrl: './biblio-detail.component.html',
  styleUrls: ['./biblio-detail.component.css']
})
export class BiblioDetailComponent implements OnInit {

    @Input() selectedLivre: Livre;
    constructor(private biblioService: BiblioService) {

    }

    ngOnInit(){

    }
}

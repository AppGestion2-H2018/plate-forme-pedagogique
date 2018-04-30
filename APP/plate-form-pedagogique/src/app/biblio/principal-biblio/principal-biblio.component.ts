import {Component, OnInit} from '@angular/core';
import {Livre} from "../../class/livre";

@Component({
  selector: 'app-principal-biblio',
  templateUrl: './principal-biblio.component.html',
  styleUrls: ['./principal-biblio.component.css']
})
export class PrincipalBiblioComponent implements OnInit {

  rechercheData: string;
  selectedData: Livre;

  constructor() { }

  ngOnInit() {
  }

  inRechercheData(event){
    this.rechercheData = event;
  }

  inSelectedLivre(event){
    this.selectedData = event;
  }
}

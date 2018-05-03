import {Component, Input, OnInit} from '@angular/core';
import {BiblioService} from "../../service/biblio.service";
import {Tablette} from "../../class/tablette";
import {Livre} from "../../class/livre";

@Component({
  selector: 'app-biblio-tablette',
  templateUrl: './biblio-tablette.component.html',
  styleUrls: ['./biblio-tablette.component.css']
})
export class BiblioTabletteComponent implements OnInit {

    @Input() tablettes: Tablette[];

    constructor() { }

    ngOnInit() {

    }

    openTablette(){

    }
}

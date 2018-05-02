import { Component, OnInit, Inject } from '@angular/core';
import {Tablette} from "../../class/tablette";

@Component({
  selector: 'app-dialog-biblio',
  templateUrl: './dialog-biblio.component.html',
  styleUrls: ['./dialog-biblio.component.css']
})
export class DialogBiblioComponent implements OnInit {

    newTablette: Tablette;

    constructor() { }

    ngOnInit() {

    }
}

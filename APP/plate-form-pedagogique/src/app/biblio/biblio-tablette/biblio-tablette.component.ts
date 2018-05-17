import {Component, Input, OnInit} from '@angular/core';
import {Tablette} from "../../class/tablette";

@Component({
  selector: 'app-biblio-tablette',
  templateUrl: './biblio-tablette.component.html',
  styleUrls: ['./biblio-tablette.component.css']
})
export class BiblioTabletteComponent implements OnInit {

    @Input() tablettes: Tablette[];


    constructor() { }

    ngOnInit() {
        console.log(this.tablettes[3].livres[0].volumeInfo.title);
    }
}

import { Component, OnInit } from '@angular/core';
import {BiblioService} from "../../service/biblio.service";
import {Tablette} from "../../class/tablette";

@Component({
  selector: 'app-biblio-tablette',
  templateUrl: './biblio-tablette.component.html',
  styleUrls: ['./biblio-tablette.component.css']
})
export class BiblioTabletteComponent implements OnInit {

  tablettes: Tablette[];


  constructor(private biblioService: BiblioService) { }

  ngOnInit() {
    this.getTablette();
  }

    getTablette(): void {
        this.biblioService.getTablette()
            .subscribe(resultat => this.tablettes = resultat);
        console.log('in ngOnInit');
    }

    openTablette(){

    }

}

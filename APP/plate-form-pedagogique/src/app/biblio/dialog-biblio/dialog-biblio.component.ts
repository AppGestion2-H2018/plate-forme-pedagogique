import { Component, OnInit } from '@angular/core';
import {BiblioService} from "../../service/biblio.service";
import {Tablette} from "../../class/tablette";

@Component({
  selector: 'app-dialog-biblio',
  templateUrl: './dialog-biblio.component.html',
  styleUrls: ['./dialog-biblio.component.css']
})
export class DialogBiblioComponent implements OnInit {

  selectionTablette: Tablette;
  newTablette: Tablette;

  tablettes: Tablette[];

  constructor(private biblioService: BiblioService) { }

  ngOnInit() {
    this.getTablette();
  }

  onSelect(tablette: Tablette): void {
    this.selectionTablette = tablette;
  }

  getTablette(): void {
    this.biblioService.getTablette()
        .subscribe(tablettes => this.tablettes = tablettes);
  }

  postTablette(): void{
    this.newTablette.user = 'Bond07';
    this.biblioService.postTablette(this.newTablette)
        .subscribe(tablette =>(this.tablettes.push(tablette)));
  }

  putTablette(){

  }
}

import {Component, OnInit} from '@angular/core';
import {Livre} from "../../class/livre";
import {BiblioService} from "../../service/biblio.service";
import {Tablette} from "../../class/tablette";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-biblio-recherche',
  templateUrl: './biblio-recherche.component.html',
  styleUrls: ['./biblio-recherche.component.css']
})
export class BiblioRechercheComponent implements OnInit {

    rechercheData: string;
    selectedData: Livre;
    tablettesData: Tablette[];
    newTablette: Tablette;

    constructor(private biblioService: BiblioService) { }

    ngOnInit() {
        this.getTablette();
        console.log('in ngOnInit');
        this.newTablette = new Tablette;
        this.newTablette.nom = '';
    }

    //Output
    inSelectedLivre(event){
        this.selectedData = event;
    }

    getTablette(): void {
        this.biblioService.getTablette()
            .subscribe(resultat => this.tablettesData = resultat);
        console.log('in ngOnInit');
    }

    postTablette(tabletteFormAjout: NgForm) {
        if(tabletteFormAjout.valid) {
            if(this.newTablette.nom != null && this.newTablette.nom != '') {
                if(this.newTablette.nom.length >= 2 && this.newTablette.nom.length <= 50) {
                    this.biblioService.postTablette(this.newTablette)
                        .subscribe(tablette  => { this.tablettesData.push(tablette); tabletteFormAjout.resetForm()});
                }
            }
        }
    }
}

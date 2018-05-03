import {Component, Input, OnInit} from '@angular/core';
import {Livre} from "../../class/livre";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DialogBiblioComponent} from "../dialog-biblio/dialog-biblio.component";
import {BiblioService} from "../../service/biblio.service";
import {Tablette} from "../../class/tablette";


@Component({
  selector: 'app-biblio-detail',
  templateUrl: './biblio-detail.component.html',
  styleUrls: ['./biblio-detail.component.css']
})
export class BiblioDetailComponent implements OnInit {

    newTablette: Tablette;
    tablettes: Tablette[];

    @Input() selectedEnfant: Livre;


    constructor(private dialog: MatDialog, private biblioService: BiblioService) {

    }

    openDialog(){ //Ouvre le dialogue sur clic de bouton.
        //Setting du pop-ip
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        //Passe le data au pop-up
        dialogConfig.data = {
            livreAAjouter:this.selectedEnfant,
            popUpTablette:this.tablettes
        };

        this.dialog.open(DialogBiblioComponent, dialogConfig);
    }
    

    ngOnInit(){
        this.getTablette()
    }

    getTablette(): void {
        this.biblioService.getTablette()
            .subscribe(resultat => this.tablettes = resultat);
        console.log('in ngOnInit');
    }
}

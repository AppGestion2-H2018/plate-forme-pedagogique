import {Component, Input, OnInit} from '@angular/core';
import {Livre} from "../../class/livre";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DialogBiblioComponent} from "../dialog-biblio/dialog-biblio.component";
import {Tablette} from "../../class/tablette";
import {BiblioService} from "../../service/biblio.service";


@Component({
  selector: 'app-biblio-detail',
  templateUrl: './biblio-detail.component.html',
  styleUrls: ['./biblio-detail.component.css']
})
export class BiblioDetailComponent implements OnInit {

    //Prend les infos de la classe parent en entré.
    @Input() selectedEnfant: Livre;
    @Input() tablettes: Tablette[];

    livreToPush: Livre;
    selectedTablette: Tablette;

    //MatDialog sert au pop-up
    constructor(private dialog: MatDialog, private biblioService: BiblioService) {

    }


    ngOnInit(){
        this.livreToPush = this.selectedEnfant;
    }

    //Lance le pop-up d'asjout de livre à un bibliothèque sur clique du bouton (+) .
    openDialog():void   {
        let dialogRef = this.dialog.open(DialogBiblioComponent, {
            data:{
                selectedTablette: this.selectedTablette,
                tablettes: this.tablettes}
        });

        //Sort du pop-up avec la tablette choisie.
        dialogRef.afterClosed().subscribe(result=>{
            this.selectedTablette = result;
            if(this.selectedTablette.livres) {
                this.selectedTablette.livres.push(this.livreToPush);
            } else {
                this.selectedTablette.livres = [this.livreToPush];
            }

            this.biblioService.putTablette(this.selectedTablette)
                .subscribe(() => this.selectedTablette = null);
            console.log(this.selectedTablette);
        });
    }
}

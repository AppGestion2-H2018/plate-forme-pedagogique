import {Component, Input, OnInit} from '@angular/core';
import {Livre} from "../../class/livre";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DialogBiblioComponent} from "../dialog-biblio/dialog-biblio.component";
import {Tablette} from "../../class/tablette";


@Component({
  selector: 'app-biblio-detail',
  templateUrl: './biblio-detail.component.html',
  styleUrls: ['./biblio-detail.component.css']
})
export class BiblioDetailComponent implements OnInit {

    //Prend les infos de la classe parent en entré.
    @Input() selectedEnfant: Livre;
    @Input() tablettes: Tablette[];

    nomNouvelletablette: String;


    //MatDialog sert au pop-up
    constructor(private dialog: MatDialog) {

    }


    ngOnInit(){

    }

    //Lance le pop-up d'asjout de livre à un bibliothèque sur clique du bouton (+) .
    openDialog():void   {
        let dialogRef = this.dialog.open(DialogBiblioComponent, {
            data:{tablettes: this.tablettes,
                nomNouvelletablette: this.nomNouvelletablette}
        });

        //Sort du pop-up avec la tablette choisie.
        dialogRef.afterClosed().subscribe(result=>{
            console.log("The dialog was close");
            this.nomNouvelletablette = result;
        });
    }
    


}

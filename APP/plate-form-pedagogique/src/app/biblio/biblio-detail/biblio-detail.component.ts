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

    @Input() selectedEnfant: Livre;
    @Input() tablettes: Tablette[];



    constructor(private dialog: MatDialog) {

    }

    ngOnInit(){

    }

    openDialog():void   {
        let dialogRef = this.dialog.open(DialogBiblioComponent, {
            data:{tablettes: this.tablettes}
        });

        dialogRef.afterClosed().subscribe(result=>{
            console.log("The dialog was close");
            this.tablettes = result;
        });
    }
    


}

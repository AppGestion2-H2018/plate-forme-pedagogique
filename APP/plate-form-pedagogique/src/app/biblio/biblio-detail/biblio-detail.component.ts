import {Component, Input, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Livre} from "../../class/livre";
import {DialogBiblioComponent} from "../dialog-biblio/dialog-biblio.component";



@Component({
  selector: 'app-biblio-detail',
  templateUrl: './biblio-detail.component.html',
  styleUrls: ['./biblio-detail.component.css']
})
export class BiblioDetailComponent implements OnInit {

    @Input() selectedEnfant: Livre;

    dialogRef: MatDialogRef<DialogBiblioComponent>;

    constructor(private dialog: MatDialog) {

    }

    openDialog(){
        this.dialogRef = this.dialog.open(DialogBiblioComponent);
    }

    ngOnInit(){

    }
}

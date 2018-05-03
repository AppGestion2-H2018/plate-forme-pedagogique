import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Tablette} from "../../class/tablette";

@Component({
  selector: 'app-dialog-biblio',
  templateUrl: './dialog-biblio.component.html',
  styleUrls: ['./dialog-biblio.component.css']
})
export class DialogBiblioComponent implements OnInit {

    popTablettes: Tablette[];

    constructor(
        private dialogRef: MatDialogRef<DialogBiblioComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.popTablettes = data.popUpTablette;
    }

    ngOnInit() {

    }

    postTablette(){

    }
}

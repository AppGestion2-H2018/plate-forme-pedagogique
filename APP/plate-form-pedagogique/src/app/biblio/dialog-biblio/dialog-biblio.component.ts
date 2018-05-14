import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-dialog-biblio',
  templateUrl: './dialog-biblio.component.html',
  styleUrls: ['./dialog-biblio.component.css']
})
export class DialogBiblioComponent implements OnInit {


    constructor(
        public dialogRef: MatDialogRef<DialogBiblioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any){}



    ngOnInit() {

    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    postTablette(){

    }

    save() {

    }

    close() {

    }
}

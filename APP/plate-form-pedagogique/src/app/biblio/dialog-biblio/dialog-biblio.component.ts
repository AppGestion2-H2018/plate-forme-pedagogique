import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NgForm} from "@angular/forms";
import {BiblioService} from "../../service/biblio.service";
import {Tablette} from "../../class/tablette";


@Component({
  selector: 'app-dialog-biblio',
  templateUrl: './dialog-biblio.component.html',
  styleUrls: ['./dialog-biblio.component.css']
})
export class DialogBiblioComponent implements OnInit {

    tablettesData: Tablette[];
    newTablette: Tablette;

    constructor(
        private biblioService: BiblioService,
        public dialogRef: MatDialogRef<DialogBiblioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any){}

    ngOnInit() {
        this.newTablette = new Tablette;
        this.newTablette.nom = '';
    }


    onSelect(tablette: Tablette): void {
        this.dialogRef.close(tablette);
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

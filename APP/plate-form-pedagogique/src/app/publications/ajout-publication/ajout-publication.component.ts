import { Component, OnInit } from '@angular/core';
import {Publication} from "../publication";
import { PublicationService } from '../publication.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-ajout-publication',
    templateUrl: './ajout-publication.component.html',
    styleUrls: ['./ajout-publication.component.css']
})
export class AjoutPublicationComponent implements OnInit {
    form: any;

    publication: Publication[];
    value;
    values : Array<string> = new Array();

    constructor(private publicationService: PublicationService) { }

    popup() {
        var popup = document.getElementById('choixTag');
        var focus = document.getElementById('texteTag').focus();
        popup.style.display = "block";
    }
    closePopup() {
        var popup = document.getElementById('choixTag');
        popup.style.display = "none";
        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }
    }
    ajoutTag() {
        var autreTag = document.getElementById('autreTag');
        console.log(this.values);
        this.values.push(this.value);
        autreTag.innerHTML = autreTag.innerHTML + ' ' + this.value;
        this.value = '';
    }

    popupGroup() {
        var popup = document.getElementById('allGroup');
        popup.style.display = "block";
    }
    closePopupGroup() {
        var popup = document.getElementById('allGroup');
        popup.style.display = "none";
        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }
    }
    fileChange(event){
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.form.get('fichier').setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                })
            };
        }
    }

    publier(){
        /*var request = document.getElementById('fichier');
        var fichier =*/

    }




    ngOnInit() {
    }


}
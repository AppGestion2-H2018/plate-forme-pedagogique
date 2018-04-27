import { Component, OnInit } from '@angular/core';
import {Publication} from "../publication";
import { PublicationService } from '../publication.service';
import {forEach} from "@angular/router/src/utils/collection";
//import {Groupe} from "../../groupe/afficher-groupe/groupe";
import {Groupe} from "../../groupe/groupe";
import {GroupeService} from "../../groupe/service/groupe.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-ajout-publication',
    templateUrl: './ajout-publication.component.html',
    styleUrls: ['./ajout-publication.component.css']
})
export class AjoutPublicationComponent implements OnInit {

    groupes: Groupe[];
    utilisateur: "1633263";
    utilisateurs: number[];

    publication: Publication;
    value: string;
    values : Array<string> = new Array();
    titre: string;
    contenu: string;
    date_remise: Date;
    date_publication: Date;
    tags: string[];
    fichier: string;


    constructor(private publicationService: PublicationService) { }

    popupGroup() {
        alert('Question prof');
        //Comment faire!!!!!????
        //this.groupes = this.groupeService.getGroupes()
        /*var liste = document.getElementById('listGroup');
        liste.innerHTML = '<p>Voici vos groupe: </p>'
        var popup = document.getElementById('allGroup');
        popup.style.display = "block";

        for(var i = 0; i <= this.groupes.length; i++){
            this.utilisateurs = this.groupes[i].utilisateur;
            for(var j = 0; j < this.utilisateurs.length; j++){
                if(this.utilisateurs[j] == this.utilisateur){
                    liste.innerHTML = liste.innerHTML + '<br><mat-checkbox>' + this.groupes[i].nom + '</mat-checkbox>';
                }
            }
        }*/

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
    publier(){
        /*var request = document.getElementById('fichier');
        var fichier =*/


        this.titre = ((document.getElementById("titre") as HTMLInputElement).value);
        this.contenu = ((document.getElementById("contenu") as HTMLInputElement).value);
        this.date_remise = new Date((document.getElementById("date_remise") as HTMLInputElement).value);
        this.date_publication = new Date();
        //Manque a decider comment entreposer les docs
        var filename = ((document.getElementById("fichier") as HTMLInputElement).value);
        this.fichier = filename.split("\\").pop();

        //Verification avant
        this.publication = {"auteur":this.utilisateur,"titre": this.titre, "contenu": this.contenu, "date_remise": this.date_remise,"date_publication":this.date_publication, "fichier":this.fichier};

        this.publicationService.postPublication(this.utilisateur, this.titre, this.contenu, this.date_remise, this.date_publication, this.fichier).subscribe();
        console.log(this.publication);
    }




    ngOnInit() {

    }


}
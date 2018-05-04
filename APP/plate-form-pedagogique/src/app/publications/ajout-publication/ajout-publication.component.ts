import { Component, OnInit } from '@angular/core';
import {Publication} from "../publication";
import { PublicationService } from '../publication.service';
import {forEach} from "@angular/router/src/utils/collection";
//import {Groupe} from "../../groupe/afficher-groupe/groupe";
import {Groupe} from "../../groupe/groupe";
import {GroupeService} from "../../groupe/service/groupe.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {isUndefined} from "util";

@Component({
    selector: 'app-ajout-publication',
    templateUrl: './ajout-publication.component.html',
    styleUrls: ['./ajout-publication.component.css'],
    providers: [GroupeService]
})
export class AjoutPublicationComponent implements OnInit {

    groupes: Groupe[];
    groupesUtilisateur: Groupe[];
    groupeId: string[];
    utilisateur: '1633263';
    utilisateurs: number[];

    publication: Publication;
    value: string;
y
    titre: string;
    contenu: string;
    date_remise: Date;
    date_publication: Date;
    tags: string[];
    fichier: string;


    constructor(private publicationService: PublicationService, private groupeService: GroupeService) { }

    toutLesGroupes(){
        this.groupeService.getGroupes().subscribe(groupes => this.groupes = groupes);
    }
    popupGroup() {
        this.groupes.forEach(groupe => {if(!isUndefined(groupe.utilisateurs)){
            groupe.utilisateurs.forEach(utilisateur => {if(utilisateur.da == this.utilisateur){
                    this.groupesUtilisateur.push(groupe);
                }
                }
            )}});
        var popup = document.getElementById('allGroup')
        var liste = document.getElementById('listGroup');
        if(this.groupesUtilisateur.length != 0){
            liste.innerHTML = '<p>Voici vos groupe: </p>';
        }
        else {
            liste.innerHTML = '<p>Vous n\'avez aucun groupe a choisir.</p>';
        }
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
    publier(){
        /*var request = document.getElementById('fichier');
        var fichier =*/

        alert('allo');
        if(this.groupesUtilisateur.length != 0){
            this.groupesUtilisateur.forEach(groupe => this.groupeId.push(groupe._id.toString()));
        }
        else {
            this.groupeId = [];
        }
        this.titre = ((document.getElementById("titre") as HTMLInputElement).value);
        this.contenu = ((document.getElementById("contenu") as HTMLInputElement).value);
        this.date_remise = new Date((document.getElementById("date_remise") as HTMLInputElement).value);
        this.date_publication = new Date();
        //Manque a decider comment entreposer les docs
        var filename = ((document.getElementById("fichier") as HTMLInputElement).value);
        this.fichier = filename.split("\\").pop();

        //Verification avant
        this.publication = {"_id": null, "auteur":this.utilisateur,"titre": this.titre, "contenu": this.contenu, "date_remise": this.date_remise,"date_publication":this.date_publication,
            "fichier":this.fichier, "groupes": this.groupeId};

        this.publicationService.postPublication(this.utilisateur, this.titre, this.contenu, this.date_remise, this.date_publication, this.fichier, this.groupeId).subscribe();
        console.log(this.publication);
    }




    ngOnInit() {
        this.toutLesGroupes()
        this.publication = {"_id": null, "auteur":null,"titre": '', "contenu": '', "date_remise": null,"date_publication":null,
            "fichier":'', "groupes": null};
    }


}
import { Component, OnInit } from '@angular/core';
import {Publication} from "../publication";
import { PublicationService } from '../publication.service';
import {forEach} from "@angular/router/src/utils/collection";
//import {Groupe} from "../../groupe/afficher-groupe/groupe";
import {Groupe} from "../../groupe/groupe";
import {GroupeService} from "../../groupe/service/groupe.service";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {isUndefined} from "util";

@Component({
    selector: 'app-ajout-publication',
    templateUrl: './ajout-publication.component.html',
    styleUrls: ['./ajout-publication.component.css'],
    providers: [GroupeService, CookieService]
})
export class AjoutPublicationComponent implements OnInit {

    groupes: Groupe[];
    groupesUtilisateur: Groupe[];
    utilisateur: string;
    utilisateurs: string[];
    publicationsTags: Publication[];
    publication: Publication;
    value: string;
    titre: string;
    contenu: string;
    date_remise: Date;
    date_publication: Date;
    tag: string;
    fichier: string;
    popup: boolean;


    constructor(private publicationService: PublicationService, private groupeService: GroupeService, private cookieService: CookieService) { }

    getPublications(): void {
        this.publicationService.getPublications()
            .subscribe(publications => this.publicationsTags = publications);
    }

    toutLesGroupes(){
        this.groupeService.getGroupes().subscribe(groupes => this.groupes = groupes);
    }
    popupGroup() {
        if(this.popup == false){
            this.groupes.forEach(groupe => {if(!isUndefined(groupe.utilisateurs)){
                groupe.utilisateurs.forEach(utilisateur => {if(utilisateur.da == this.utilisateur){
                        this.groupesUtilisateur.push(groupe);
                    }
                    }
                )}});
            var popup = document.getElementById('allGroup');
            var liste = document.getElementById('listGroup');
            if(this.groupesUtilisateur.length != 0){
                liste.innerHTML = '<p>Voici vos groupe: </p>';
            }
            else {
                liste.innerHTML = '<p>Vous n\'avez aucun groupe a choisir.</p>';
            }
            popup.style.display = "block";
            this.popup = true;
        }
        else {
            var popup = document.getElementById('allGroup');
            popup.style.display = "block";
        }


    }
    closePopupGroup() {
        var popup = document.getElementById('allGroup');
        popup.style.display = "none";
        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }
        //var checkboxes =
    }

    addTag(){
        if(this.tag != ""){
            this.publication.tags.push(this.tag);
        }
        this.tag = "";
    }

    publier(){

        if(this.groupesUtilisateur.length != 0){
            this.groupesUtilisateur.forEach(groupe => this.publication.groupes.push(groupe));
        }
        else {
            this.publication.groupes = [];
        }


        this.publication.date_publication = new Date();
        //Manque a decider comment entreposer les docs
        var filename = ((document.getElementById("fichier") as HTMLInputElement).value);
        this.publication.fichier = filename.split("\\").pop();

        //Demande au service!
        this.publicationService.postPublication(this.publication).subscribe();
        console.log(this.publication);
    }




    ngOnInit() {
        this.getPublications();
        this.toutLesGroupes();
        this.groupesUtilisateur = [];
        this.groupes = [];
        this.publication = {"_id": undefined, "auteur":"Ordi","titre": '', "contenu": '', "date_remise": null,"date_publication":null,
            "fichier":'', "groupes": [], tags: []};
        this.tag = "";
        this.popup = false;
        this.utilisateur = this.cookieService.get('auth_da');
        console.log(this.utilisateur);
    }


}
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
import { Router, ActivatedRoute } from '@angular/router';

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
    publication: Publication;
    tag: string;
    popup: boolean;
    returnUrl: string;


    constructor(private publicationService: PublicationService, private groupeService: GroupeService, private cookieService: CookieService,
                private route: ActivatedRoute, private router: Router) { }


    /*
    Fonction qui vas chercher tous les groupes.
    Elle est appeler a l inition de la page
     */
    toutLesGroupes(){
        this.groupeService.getGroupes().subscribe(groupes => this.groupes = groupes);
    }

    /*
    Fonction qui fait apparaitre le popup de choix de groupe.
    Appeler quand on clique sur le bouton "groupes"
     */
    popupGroup() {
        //Vas chercher tous les groupes dont l utilisateur fait parti
        this.groupes.forEach(groupe => {if(!isUndefined(groupe.utilisateurs)){
            groupe.utilisateurs.forEach(utilisateur => {if(utilisateur.da == this.utilisateur){
                    this.groupesUtilisateur.push(groupe);
                }
                }
            )}});
        console.log(this.groupes);
        console.log(this.groupesUtilisateur);
        var popup = document.getElementById('allGroup');
        var liste = document.getElementById('listGroup');
        if(this.groupesUtilisateur.length != 0){
            liste.innerHTML = '<p>Voici vos groupe: </p>';
        }
        else {
            liste.innerHTML = '<p>Vous n\'avez aucun groupe a choisir.</p>';
        }
        //rend le popup visible
        popup.style.display = "block";
        this.popup = true;


    }
    //fonction pour fermer le popup des groupes
    //Appeler quand on clique sur le "x" ou bien a coter du popup
    closePopupGroup() {
        var popup = document.getElementById('allGroup');
        popup.style.display = "none";
        window.onclick = function(event) {
            if (event.target == popup) {
                //rend le popup invisible
                popup.style.display = "none";
            }
        }
    }

    /*
    Fonction qui ajoute un tag au tableau de tous les tags
    appeler quand on pese sur le petit plus des tags
    */
    addTag(){
        var ajout = true;
        //On ne veut pas que le tag soit vide
        if(this.tag == ""){
            ajout = false;
        }
        //on ne veut pas que le tag soit comme un des autres tags
        this.publication.tags.forEach(tag =>
        {
            if(this.tag == tag){
                ajout = false;
            }
        }
        );

        if(ajout == true){
            this.publication.tags.push(this.tag);
        }
        this.tag = "";
        console.log(this.publication.tags)
    }

    /*
    Fonction qui permet la publication du post
    Appeler quand on clique sur le bouton publier ou sur un "enter"
     */
    publier(){

        //transfert tous les groupes choisis dans la bonne variable de classe
        if(this.groupesUtilisateur.length != 0){
            this.groupesUtilisateur.forEach(groupe => this.publication.groupes.push(groupe));
        }
        else {
            this.publication.groupes = [];
        }

        //met la date du moment comme date de publication
        this.publication.date_publication = new Date();
        //Manque a decider comment entreposer les docs
        var filename = ((document.getElementById("fichier") as HTMLInputElement).value);
        this.publication.fichier = filename.split("\\").pop();

        //Demande au service!
        this.publicationService.postPublication(this.publication).subscribe();
        console.log(this.publication);

        // retour a la page precedente un fois la publication reussi.
        this.router.navigateByUrl(this.returnUrl);

    }

    /*
    Fonction appeler a l initialisation de la page et qui initialise toutes les variables
     */
    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.toutLesGroupes();
        this.groupesUtilisateur = [];
        this.groupes = [];
        this.publication = {"_id": undefined, "auteur":"Ordi","titre": '', "contenu": '', "date_remise": null,"date_publication":null,
            "fichier":'', "groupes": [], "tags": [], "commentaires": []};
        this.tag = "";
        this.popup = false;
        this.utilisateur = this.cookieService.get('auth_da');
        console.log(this.utilisateur);
    }


}
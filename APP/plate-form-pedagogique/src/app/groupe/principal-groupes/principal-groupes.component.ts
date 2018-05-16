import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Utilisateur} from "../../class/utilisateur";
import {UtilisateurService} from "../../service/utilisateur.service";

@Component({
    selector: 'app-principal-groupes',
    templateUrl: './principal-groupes.component.html',
    styleUrls: ['./principal-groupes.component.css']
})
export class PrincipalGroupesComponent implements OnInit {

    utilisateur = new Utilisateur();

    constructor(protected cookieService: CookieService,
                protected utilisateurService: UtilisateurService) {
        this.utilisateur._id = this.cookieService.get("auth_id");
    }

    getUtilisateur(): void {
        this.utilisateurService.getUtilisateur(this.utilisateur).subscribe(
            utilisateur => {
                this.utilisateur = utilisateur;
            },
            error => {
                console.error(error);
            }
        );
        console.log(this.utilisateur);
    }

    ngOnInit() {
        this.getUtilisateur();
        console.log(this.utilisateur);
    }


}

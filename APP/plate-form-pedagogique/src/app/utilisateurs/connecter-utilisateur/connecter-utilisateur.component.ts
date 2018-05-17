import {Component, OnInit, Input, Output} from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../class/utilisateur';
import {ReponseLogin} from "../../class/reponseLogin"
import {AppComponent} from "../../app.component";
import {CookieService} from "ngx-cookie-service";
import {AuthHttpInterceptor} from "../../service/auth.interceptor";

@Component({
    selector: 'app-connecter-utilisateur',
    templateUrl: './connecter-utilisateur.component.html',
    styleUrls: ['./connecter-utilisateur.component.css'],
})
export class ConnecterUtilisateurComponent implements OnInit {
    reponseLogin: ReponseLogin;
    utilisateurs: Utilisateur;
    da: string;
    motdepasse: string;
    code: number;

    constructor(private utilisateurservie: UtilisateurService, private cookieService: CookieService) {
    }

    login(): void {
        this.utilisateurservie.getUtilisateurLogin(this.da, this.motdepasse).subscribe(reponseLogin => {
            this.reponseLogin = reponseLogin;
            console.log(this.reponseLogin);
        });
    }

    ngOnInit() {
        this.reponseLogin = {'Code': 0, 'Message': ''};
        console.log(this.reponseLogin);
        this.code = 0;
    }
}

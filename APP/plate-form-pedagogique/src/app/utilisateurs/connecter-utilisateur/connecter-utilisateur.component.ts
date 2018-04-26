import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../class/utilisateur';
import{ReponseLogin} from "../../class/reponseLogin"

@Component({
    selector: 'app-connecter-utilisateur',
    templateUrl: './connecter-utilisateur.component.html',
    styleUrls: ['./connecter-utilisateur.component.css']
})
export class ConnecterUtilisateurComponent implements OnInit {

<<<<<<< HEAD
    utilisateures: Utilisateur[];
    da: number;
    motdepasse: number;
=======
  reponseLogin: ReponseLogin;
  utilisateurs: Utilisateur;
  da: string;
  motdepasse: string;
  code:number;
>>>>>>> 773cdf193ee78c476c1df3bf25209286d71639c4

    constructor(private utilisateurservie: UtilisateurService) {
    }


    login(): void {

<<<<<<< HEAD
        this.utilisateurservie.getUtilisateurLogin(this.da, this.motdepasse).subscribe();
    }
=======
    this.utilisateurservie.getUtilisateurLogin(this.da,this.motdepasse).subscribe(reponseLogin => this.reponseLogin = reponseLogin);
    console.log(this.reponseLogin);
  }
>>>>>>> 773cdf193ee78c476c1df3bf25209286d71639c4


    ngOnInit() {
        this.reponseLogin = { 'Code': 0,'Message':''};
        console.log(this.reponseLogin);
        this.code = 0;
    }
}

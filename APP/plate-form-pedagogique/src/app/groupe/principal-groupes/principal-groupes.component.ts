import { Component, OnInit, Input } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Utilisateur} from "../../class/utilisateur";
import {UtilisateurService} from "../../service/utilisateur.service";

@Component({
  selector: 'app-principal-groupes',
  templateUrl: './principal-groupes.component.html',
  styleUrls: ['./principal-groupes.component.css']
})
export class PrincipalGroupesComponent implements OnInit {

  userId: string;
  utilisateur = new Utilisateur();

  constructor(private cookiService : CookieService, private utilisateurService: UtilisateurService) {
      this.userId = this.cookiService.get("auth_id");
      this.utilisateur._id = this.userId;
  }

  getUtilisateur() : void
  {
      this.utilisateur._id = this.userId;
      this.utilisateurService.getUtilisateur(this.utilisateur).subscribe(
          data => {
              this.utilisateur = data;
          },
          error => {
              console.error(error);
          }
      );
  }

  ngOnInit() {
    this.getUtilisateur();
    console.log(this.utilisateur);
  }



}

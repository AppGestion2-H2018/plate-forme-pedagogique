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

  utilisateur = new Utilisateur();

  constructor(private cookiService : CookieService, private utilisateurService: UtilisateurService) {
      this.utilisateur._id = this.cookiService.get("auth_id");
  }

  getUtilisateur() : void
  {
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
  }



}

import {Component, Input, OnInit} from '@angular/core';
import {Groupe} from "../groupe"
import {GroupeService} from '../service/groupe.service';
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurService} from "../../service/utilisateur.service";
import {AfficherGroupeComponent} from "../afficher-groupe/afficher-groupe.component";

@Component({
  selector: 'app-afficherungroupe',
  templateUrl: './afficherungroupe.component.html',
  styleUrls: ['./afficherungroupe.component.css'],
    providers: [GroupeService, FormsModule]
})
export class AfficherungroupeComponent extends AfficherGroupeComponent implements OnInit {

  @Input() afficherGroupe: Groupe;
  public id: string;
  constructor(protected groupeService: GroupeService, protected cookieService: CookieService,
              protected utilisateurService: UtilisateurService, protected router: Router, private  route: ActivatedRoute) {
      super( groupeService,cookieService,utilisateurService,router);

  }
  groupes: Groupe[];


    getGroupes() {
        this.groupeService.getGroupes()
            .subscribe(groupe => this.groupes = groupe);
    }
    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getGroupes();
      this.getUtilisateurs();
      this.getTypes();
      this.getClasses();
      this.getProgrammes();
      console.log(this.id);
  }
}

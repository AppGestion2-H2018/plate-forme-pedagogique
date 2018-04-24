import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../class/utilisateur';

@Component({
  selector: 'app-connecter-utilisateur',
  templateUrl: './connecter-utilisateur.component.html',
  styleUrls: ['./connecter-utilisateur.component.css']
})
export class ConnecterUtilisateurComponent implements OnInit {

  utilisateures: Utilisateur[];
  da: number;
  motdepasse: number;

  constructor(private utilisateurservie: UtilisateurService) { }


  login(): void{

    this.utilisateurservie.getUtilisateurLogin(this.da,this.motdepasse).subscribe();
  }


    ngOnInit() {

    }
}

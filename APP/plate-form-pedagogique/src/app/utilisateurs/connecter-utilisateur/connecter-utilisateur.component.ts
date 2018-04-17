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
  da: string;
  motdepasse: string;

  constructor(private utilisateurservie: UtilisateurService) { }


  login(): void{
    console.log(this.da);
    console.log(this.motdepasse);
  }
    getUtilisateurs():void{
      this.utilisateurservie.getUtilisateur().subscribe(utilisateures => {this.utilisateures = utilisateures
      });
    }
    ngOnInit() {
        this.getUtilisateurs();
    }
}

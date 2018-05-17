import { Component, OnInit, ApplicationRef } from '@angular/core';
import { UtilisateurService } from '../../service/utilisateur.service';
import { Utilisateur } from '../../class/utilisateur';
import { ReponseAPI } from '../../class/reponseAPI';

@Component({
  selector: 'app-recuperer-mot-de-passe',
  templateUrl: './recuperer-mot-de-passe.component.html',
  styleUrls: ['./recuperer-mot-de-passe.component.css']
})
export class RecupererMotDePasseComponent implements OnInit {
  reponseAPI: ReponseAPI;
  courriel: string;

  constructor(private utilisateurService:UtilisateurService, private ref: ApplicationRef) { }

  // Envoi du courriel de réinitialisation du mot de passe
  onSubmit():void{
    // Appelle la fonction d'envoi de courriel du server
    this.utilisateurService.sendResetPassword(this.courriel).subscribe(reponseAPI => this.reponseAPI = reponseAPI);
  }

  ngOnInit() {
    this.reponseAPI =  {'Code' : 0, 'Message':'aucune réponse'};
    console.log('mot de passe oublé');
  }

}

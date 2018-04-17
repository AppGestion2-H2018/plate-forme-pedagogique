import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../service/utilisateur.service';

@Component({
  selector: 'app-recuperer-mot-de-passe',
  templateUrl: './recuperer-mot-de-passe.component.html',
  styleUrls: ['./recuperer-mot-de-passe.component.css']
})
export class RecupererMotDePasseComponent implements OnInit {

  courriel: string;

  constructor(private utilisateurService:UtilisateurService) { }

  // Envoi du courriel de réinitialisation du mot de passe
  forgotpassword():void{
    console.log(this.courriel);
    // Valide si le courriel est présent dans la bd

    // Appelle la fonction d'envoi de courriel du server
    this.utilisateurService.sendResetPassword();
  }

  ngOnInit() {
  }

}

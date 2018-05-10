import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from '../../service/utilisateur.service';
import { ReponseAPI } from '../../class/reponseAPI';

@Component({
  selector: 'app-modifier-mot-de-passe',
  templateUrl: './modifier-mot-de-passe.component.html',
  styleUrls: ['./modifier-mot-de-passe.component.css']
})
export class ModifierMotDePasseComponent implements OnInit {
  reponseValidateToken: ReponseAPI;
  samePassword: boolean;
  resetPasswordToken: string;

  constructor(
    private route: ActivatedRoute,
    private utilisateurService:UtilisateurService
  ) { }

  // Envoi du courriel de réinitialisation du mot de passe
  onSubmit():void{
    // Appelle la fonction d'envoi de courriel du server
    //this.utilisateurService.sendResetPassword(this.courriel).subscribe(reponseAPI => this.reponseAPI = reponseAPI);
  }

  // Vérifie si le token est toujours valide
  validerToken(): void {
    this.utilisateurService.validateResetPasswordToken(this.resetPasswordToken).subscribe(reponseAPI => this.reponseValidateToken = reponseAPI);
  }

  ngOnInit() {
    this.resetPasswordToken = this.route.snapshot.paramMap.get('resetPasswordToken');
    this.validerToken();
    this.reponseValidateToken =  {'Code' : 0, 'Message':'aucune réponse'};
  }



}

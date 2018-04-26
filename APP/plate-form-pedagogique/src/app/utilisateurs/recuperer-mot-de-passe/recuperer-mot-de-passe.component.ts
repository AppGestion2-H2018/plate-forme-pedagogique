import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../service/utilisateur.service';
import { Utilisateur } from '../../class/utilisateur';
import { ReponseAPI } from '../../class/reponseAPI';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-recuperer-mot-de-passe',
  templateUrl: './recuperer-mot-de-passe.component.html',
  styleUrls: ['./recuperer-mot-de-passe.component.css']
})
export class RecupererMotDePasseComponent implements OnInit {
  reponseAPI: ReponseAPI;
  courriel: string;
  code: boolean;


  constructor(private utilisateurService:UtilisateurService, private ref:ChangeDetectorRef) { }

  // Envoi du courriel de réinitialisation du mot de passe
  forgotpassword():void{
    console.log(this.ref);
    // Appelle la fonction d'envoi de courriel du server
    this.utilisateurService.sendResetPassword(this.courriel).subscribe(
      function(reponseAPI){
        console.log(reponseAPI)

        this.reponseAPI = reponseAPI;

        console.log(this.reponseAPI.Code + ' ' + this.reponseAPI.Message);
        // this.ref.detectChanges();
        console.log(this.ref);
        // this.ref.markForCheck();
        this.code = false;
        console.log(this.code);
      },
      function(error) { console.log("Error happened" + error)}
    );
    this.ref.markForCheck();
  }

  ngOnInit() {
    this.code = true;
    this.reponseAPI =  {'Code' : 1, 'Message':'test'};
    console.log(this.reponseAPI);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connecter-utilisateur',
  templateUrl: './connecter-utilisateur.component.html',
  styleUrls: ['./connecter-utilisateur.component.css']
})
export class ConnecterUtilisateurComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
    usager: number;
    motsdepasse: string;
}

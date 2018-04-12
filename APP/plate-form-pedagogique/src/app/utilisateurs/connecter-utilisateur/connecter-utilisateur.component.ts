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
    loginUsager(e){
        e.preventDefault();
        var usager = e.target.elements[0].value;
        var motdepasse = e.target.elements[1].value;

        if(usager=="admin"&&motdepasse=="admin"){

        }
    }
}

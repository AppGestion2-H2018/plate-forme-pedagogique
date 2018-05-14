import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-utilisateurs',
  templateUrl: './menu-utilisateurs.component.html',
  styleUrls: ['./menu-utilisateurs.component.css']
})
export class MenuUtilisateursComponent implements OnInit {
    DAutilisateurConnecte : string;

  constructor() { }

  ngOnInit() {
      this.DAutilisateurConnecte = localStorage.getItem('DAutilisateurConnecte');
  }

}

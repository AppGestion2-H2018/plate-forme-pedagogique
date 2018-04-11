import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connecterutilisateur',
  templateUrl: './connecterutilisateur.component.html',
  styleUrls: ['./connecterutilisateur.component.css']
})
export class ConnecterutilisateurComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  loginUsager(e){
    e.preventDefault();
    var usager = e.target.elements[0].value;
    var motdepasse = e.target.elements[1].value;
  }
}

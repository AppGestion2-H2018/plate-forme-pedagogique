import { Component, OnInit } from '@angular/core';
import {Groupe} from "./groupe"
import { GROUPES } from './liste-groupe-test';
@Component({
  selector: 'app-afficher-groupe',
  templateUrl: './afficher-groupe.component.html',
  styleUrls: ['./afficher-groupe.component.css']
})
export class AfficherGroupeComponent implements OnInit {
    groupes = GROUPES;
  constructor() { }

  ngOnInit() {
  }

}

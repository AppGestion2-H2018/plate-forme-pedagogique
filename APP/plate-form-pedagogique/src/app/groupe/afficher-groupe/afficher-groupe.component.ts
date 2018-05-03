import { Component, OnInit } from '@angular/core';
import {Groupe} from "../groupe"
import {GroupeService} from '../service/groupe.service';

@Component({
  selector: 'app-afficher-groupe',
  templateUrl: './afficher-groupe.component.html',
  styleUrls: ['./afficher-groupe.component.css'],
    providers: [GroupeService]
})
export class AfficherGroupeComponent implements OnInit {
    groupes: Groupe[];
  constructor(private groupeService : GroupeService) { }

  deleteGroupe(groupe : Groupe) {
		this.groupeService.deleteGroupe(groupe).subscribe();
	}
  //result => this.groupes = this.groupes.filter(g => g._id !== id)
  ngOnInit() {
	  
  }
  
}

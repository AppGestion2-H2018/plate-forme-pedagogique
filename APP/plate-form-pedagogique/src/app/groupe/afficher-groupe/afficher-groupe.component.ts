import { Component, OnInit } from '@angular/core';
import {Groupe} from "./groupe"
import { GROUPES } from './liste-groupe-test';
import { GroupeService } from '../service/groupe.service';

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
  deleteGroupe(id : string) {
			var groupes = this.groupes;
			//this.groupeService.deleteGroupe(id).subscribe(data => {
//			if(data.n == 1){
//				for(var i = 0; i < groupes.length; i++) {
	//				if(groupes[i]._id == id) {
	//					groupes.splice(i,1);
	//				}
//				}
//			}
//		});
	}
}

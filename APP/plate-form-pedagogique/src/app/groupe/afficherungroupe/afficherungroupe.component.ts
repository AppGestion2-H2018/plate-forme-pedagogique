import { Component, OnInit } from '@angular/core';
import {Groupe} from "../groupe"
import {GroupeService} from '../service/groupe.service';

@Component({
  selector: 'app-afficherungroupe',
  templateUrl: './afficherungroupe.component.html',
  styleUrls: ['./afficherungroupe.component.css']
})
export class AfficherungroupeComponent implements OnInit {

  constructor(private groupeService: GroupeService) { }
  selectedGroupe: Groupe;


  onSelected(id: string): void {
	  this.selectedGroupe._id = id;
  }
    ngOnInit() {
	  
  }
}

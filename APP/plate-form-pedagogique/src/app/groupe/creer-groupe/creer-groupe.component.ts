import { Component, OnInit } from '@angular/core';
import { GroupeService } from '../service/groupe.service';
@Component({
  selector: 'app-creer-groupe',
  templateUrl: './creer-groupe.component.html',
  styleUrls: ['./creer-groupe.component.css'],
  providers:[TaskService]
})
export class CreerGroupeComponent implements OnInit {

  constructor(private groupeService:GroupService) { }

  ngOnInit() {
  }

}

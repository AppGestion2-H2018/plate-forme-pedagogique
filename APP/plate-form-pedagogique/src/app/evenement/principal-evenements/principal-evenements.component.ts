import { Component, OnInit } from '@angular/core';
import {EvenementService} from "../../service/evenement.service";

@Component({
  selector: 'app-principal-evenements',
  templateUrl: './principal-evenements.component.html',
  styleUrls: ['./principal-evenements.component.css'],
    providers:[EvenementService]
})
export class PrincipalEvenementsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

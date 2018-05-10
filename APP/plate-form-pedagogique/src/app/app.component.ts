import {Component} from '@angular/core';
import {UtilisateurService} from './service/utilisateur.service';
import {FormControl} from '@angular/forms';
import { EvenementService } from './evenement/evenement.service';
import {Utilisateur} from './class/utilisateur'
import {Event} from "./evenement/models/event";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[EvenementService,UtilisateurService]
})
export class AppComponent {
    estConnecte = true;

    constructor(private utilisateurService: UtilisateurService) {
    }

    aLesDroitsDacces = true;
    title = 'Plate-forme pédagogique H2018';
    tiles = [
        {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];

    ngOnInit() {
        //temporaire en attendant que le login soit complété
        localStorage.setItem('DAutilisateurConnecte', '1234567');
    }
}
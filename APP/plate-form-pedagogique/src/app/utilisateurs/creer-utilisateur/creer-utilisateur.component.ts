import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../class/utilisateur';

@Component({
    selector: 'app-creer-utilisateur',
    templateUrl: './creer-utilisateur.component.html',
    styleUrls: ['./creer-utilisateur.component.css']
})
export class CreerUtilisateurComponent implements OnInit {

    utilisateur: Utilisateur;

    constructor(private utilisateurService: UtilisateurService) {

        this.utilisateurService.registerUtilisateur(this.utilisateur).subscribe();
    }

    ngOnInit() {
    }

}

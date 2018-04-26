import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../class/utilisateur';

@Component({
    selector: 'app-creer-utilisateur',
    templateUrl: './creer-utilisateur.component.html',
    styleUrls: ['./creer-utilisateur.component.css']
})
export class CreerUtilisateurComponent implements OnInit {

    utilisateur = new Utilisateur();

    constructor(private utilisateurService: UtilisateurService) {

    }

    register(event: any): void {
        event.preventDefault();
        this.utilisateurService.registerUtilisateur(this.utilisateur).subscribe();
    }

    ngOnInit() {

    }
}

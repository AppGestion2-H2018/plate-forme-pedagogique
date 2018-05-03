import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../class/utilisateur';
import {ReponseAPI} from '../../class/reponseAPI';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-creer-utilisateur',
    templateUrl: './creer-utilisateur.component.html',
    styleUrls: ['./creer-utilisateur.component.css']
})
export class CreerUtilisateurComponent implements OnInit {
    reponseAPI: ReponseAPI;
    utilisateur = new Utilisateur();

    programmes = [
        {value: '0', viewValue: 'Informatique'},
        {value: '1', viewValue: 'Comptabilité et gestion'},
        {value: '2', viewValue: 'Électronique industrielle'},
        {value: '3', viewValue: 'Soins infirmiers'},
        {value: '4', viewValue: 'Sciences de la nature'},
        {value: '5', viewValue: 'Sciences humaines'}
    ];

    types = [
        {value: '0', viewValue: 'Étudiant'},
        {value: '1', viewValue: 'Enseignant'},
        {value: '2', viewValue: 'Personnel de soutien'}
    ];


    constructor(private utilisateurService: UtilisateurService) {

    }

    register(event: any, utilisateurFormAjout: NgForm): void {
        event.preventDefault();

        if (utilisateurFormAjout.valid) {
            this.utilisateurService.registerUtilisateur(this.utilisateur).subscribe(reponseAPI => this.reponseAPI = reponseAPI);
        }
    }

    ngOnInit() {
        // this.reponseAPI = {'Code': 5, 'Message': 'Message test d\'erreur.'};
        this.reponseAPI = {'Code': 0, 'Message': 'Aucun message'};
        console.log(this.reponseAPI);
    }
}

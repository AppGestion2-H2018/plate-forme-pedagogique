import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Utilisateur} from '../../class/utilisateur';
import {ReponseAPI} from '../../class/reponseAPI';
import {NgForm} from '@angular/forms';
import {ValidateEmailNotTaken} from '../../validators/async-email-not-taken.validator';
import {Type} from '../../class/type';

@Component({
    selector: 'app-creer-utilisateur',
    templateUrl: './creer-utilisateur.component.html',
    styleUrls: ['./creer-utilisateur.component.css']
})
export class CreerUtilisateurComponent implements OnInit {

    reponseAPI: ReponseAPI;

    utilisateur = new Utilisateur();
    types: Type[];

    editMode = false;

    titreDeLaPage: string;
    titreDuBoutonEnregistrement: string;

    constructor(private utilisateurService: UtilisateurService, private route: ActivatedRoute) {

    }

    save(event: any, utilisateurFormAjout: NgForm): void {
        event.preventDefault();

        if (utilisateurFormAjout.valid) {
            if (this.editMode) {
                this.utilisateurService.updateUtilisateur(this.utilisateur).subscribe(reponseAPI => this.reponseAPI = reponseAPI);
            } else {
                this.utilisateur._id = null;
                this.utilisateurService.registerUtilisateur(this.utilisateur).subscribe(reponseAPI => this.reponseAPI = reponseAPI);
            }
        }
    }

    ngOnInit() {

        this.reponseAPI = {'Code': 0, 'Message': 'Aucun message'};
        this.getTypes();

        this.route.params.subscribe(
            (params: Params) => {
                this.utilisateur._id = params['utilisateurId'] ? params['utilisateurId'] : '';
                this.editMode = params['utilisateurId'] != null;

                this.initForm();

                this.titreDeLaPage = this.editMode ? 'Modifier l\'utilisateur' : 'Créer un nouvel utilisateur';
                this.titreDuBoutonEnregistrement = this.editMode ? 'Mettre à jour' : 'Créer';

                // TODO: Validation du courriel côté client
            }
        );
    }


    private initForm() {
        if (this.editMode) {
            this.utilisateurService.getUtilisateur(this.utilisateur).subscribe(
                data => {
                    this.utilisateur = data;
                },
                error => {
                    console.error(error);
                }
            );
        }
    }

    getTypes(): void {
        this.utilisateurService.getTypes()
            .subscribe(types => this.types = types);
    }
}

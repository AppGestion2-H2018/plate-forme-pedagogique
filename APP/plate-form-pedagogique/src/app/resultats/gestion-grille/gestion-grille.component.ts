import {Component, OnInit} from '@angular/core';
import {ResultatService} from '../resultat.service';
import {Cours} from "../cours";
//import {Enseignant} from "../enseignant";
import {Groupe} from "../groupe.";
import {Grilleevaluation} from "../grilleevaluation";
import {Evaluation} from "../evaluation";

@Component({
    selector: 'app-gestion-grille',
    templateUrl: './gestion-grille.component.html',
    styleUrls: ['./gestion-grille.component.css'],
    providers: [ResultatService]
})
export class GestionGrilleComponent implements OnInit {
    cours: Cours[];
    groupes: Groupe[];
    grilleevaluation: Grilleevaluation;
    evaluations: Evaluation[];
    selectedCours: Cours;
    selectedGroupe: Groupe;
    evaluationTemp: Evaluation;

    constructor(private resultatService: ResultatService) {
        this.resultatService.getCours(9)
            .subscribe(cours => {
                this.cours = cours;
            });
    }

    ngOnInit() {
        this.resultatService.getCours(9);
    }

    onChangeCours(cours: Cours): void {
        if (cours !== null) {
            this.selectedCours = cours;
            this.selectedGroupe = null;
            this.evaluations = null;
            this.grilleevaluation = null;

            this.resultatService.getGroupe(cours.id)
                .subscribe(groupes => {
                    this.groupes = groupes;

                });
        }
        else {
            this.selectedCours = null;
            this.selectedGroupe = null;
            this.evaluations = null;
            this.grilleevaluation = null;
        }
    }


    onChangeGroupe(groupe: Groupe): void {
        if (groupe !== null) {
            this.selectedGroupe = groupe;
            this.evaluations = null;
            this.grilleevaluation = null;
            this.resultatService.getGrilleevaluations(9, groupe.cours_id, groupe.id)
                .subscribe(value => {
                        this.grilleevaluation = value;
                    },
                    (err) => console.error(err),
                    () => {
                        if (this.grilleevaluation[0]) {
                            this.resultatService.getEvaluations(this.grilleevaluation[0].id)
                                .subscribe(evaluation => {
                                        if (evaluation != null && evaluation.length > 0) {
                                            this.evaluations = evaluation;
                                        }
                                    }
                                );
                        }
                    });
        }
        else {
            this.selectedGroupe = null;
            this.grilleevaluation = null;
            this.evaluations = null;
        }
    }

    //Ajout d'une nouvelle évaluation
    //Todo: Mettre les données d'un formulaire au lieux d'être hardcoded
    ajoutEvaluation(grilleevaluation_id: number) {
        this.evaluationTemp.grilleevaluation_id = grilleevaluation_id;
        this.evaluationTemp.nom = "Ajout Hardcoded";
        this.evaluationTemp.commentaire = "Ajout Hardcoded";
        this.evaluationTemp.categorie_id = 1;
        this.evaluationTemp.poids_evaluation = 10;
        console.log(this.evaluationTemp);

        console.log("Adding evaluation for grille évaluation #" + grilleevaluation_id);
        this.resultatService.ajouterEvaluation(this.evaluationTemp)
            .subscribe(
                value => {
                    // show an alert to tell the user if grille evaluation was created or not
                    console.log(value);
                },
                error => console.log(error)
            );
    }

    //Ajout d'une nouvelle évaluation sans grille
    //Todo: Mettre les données d'un formulaire au lieux d'être hardcoded
    ajoutEvaluationSansGrille(enseignant_id: number, cours_id: number, groupe_id: number) {
        console.log("Adding evaluation for teacher #" + enseignant_id + " for class #" + cours_id + " and groupe #" + groupe_id);
        this.resultatService.ajoutGrilleevaluation(enseignant_id, cours_id, groupe_id)
            .subscribe(
                value => {
                    // show an alert to tell the user if grille evaluation was created or not
                    console.log(value);
                },
                error => console.log(error)
            );
    }

    //Suppression d'une évaluation
    //Popup aide par: William Houle
    deleteEvaluation(evaluation_id: number) {
        console.log("Deleting evaluation #" + evaluation_id);
        var ans = confirm("Voulez-vous vraiment supprimer cette évaluation?");
        if(ans){
        this.resultatService.supprimerEvaluation(evaluation_id)
            .subscribe(
                value => {
                    // show an alert to tell the user if grille evaluation was created or not
                    console.log(value);
                },
                error => console.log(error),
                () => this.onChangeGroupe(this.selectedGroupe)
            );
        }
    };


    //Modification d'une évaluation
    //Aide: William Houle
    //Todo: Mettre les données d'un formulaire au lieux d'être hardcoded
    modifierEvaluation(evaluation:Evaluation) {
        var ans = confirm("Voulez-vous vraiment modifier cette évaluation?");
        if(ans){
            this.resultatService.modifierEvaluation(evaluation)
                .subscribe(
                    value => {
                        // show an alert to tell the user if grille evaluation was created or not
                        console.log(value);
                    },
                    error => console.log(error),
                    () => this.onChangeGroupe(this.selectedGroupe)

                );

        }
    }

}
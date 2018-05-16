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

    ajoutGrilleevaluation(enseignant_id: number, cours_id: number, groupe_id: number) {
        console.log("Adding grille evaluation for teacher #" + enseignant_id + " for class #" + cours_id + " and groupe #" + groupe_id);
        this.resultatService.ajoutGrilleevaluation(enseignant_id, cours_id, groupe_id)
            .subscribe(
                value => {
                    // show an alert to tell the user if grille evaluation was created or not
                    console.log(value);
                },
                error => console.log(error)
            );
    }

    deleteEvaluation(evaluation_id: number) {
        console.log("Deleting evaluation #" + evaluation_id);
        this.resultatService.supprimerEvaluation(evaluation_id)
            .subscribe(
                value => {
                    // show an alert to tell the user if grille evaluation was created or not
                    console.log(value);
                },
                error => console.log(error)
            );
    };

    modifierEvaluation(evaluation_id: number) {
        console.log("Modifying evaluation #" + evaluation_id);
        this.resultatService.modifierEvaluation(evaluation_id)
            .subscribe(
                value => {
                    // show an alert to tell the user if grille evaluation was created or not
                    console.log(value);
                },
                error => console.log(error)
            );
    }

}
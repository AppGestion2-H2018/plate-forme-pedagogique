import {Component, OnInit} from '@angular/core';
import {ResultatService} from '../resultat.service';
import {Cours} from "../cours";
//import {Enseignant} from "../enseignant";
import {Groupe} from "../groupe.";
import {Grilleevaluation} from "../grilleevaluation";
import {Evaluation} from "../evaluation";

@Component({
    selector: 'app-ajout-grille',
    templateUrl: './ajout-grille.component.html',
    styleUrls: ['./ajout-grille.component.css'],
    providers: [ResultatService]
})
export class AjoutGrilleComponent implements OnInit {
    cours: Cours[];
    groupes: Groupe[];
    grilleevaluation: Grilleevaluation;
    evaluations: Evaluation[];
    selectedCours: Cours;
    selectedGroupe: Groupe;
    test: Object;

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
            this.resultatService.getGrilleevaluations(9, groupe.id, groupe.cours_id)
                .subscribe(value => {
                        this.grilleevaluation = value;
                    },
                    (err) => console.error(err),
                    () => {
                        if (this.grilleevaluation[0]) {
                            this.resultatService.getEvaluations(this.grilleevaluation[0].id)
                                .subscribe(evaluation => {
                                        if (evaluation != null) {
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

    ajoutGrilleevaluation(enseignant_id:number,cours_id:number, groupe_id:number) {
        this.resultatService.ajoutGrilleevaluation(enseignant_id, cours_id, groupe_id );
        console.log("Adding grille evaluation for teacher #" + enseignant_id + " for class #" + cours_id + " and groupe #" + groupe_id);

    }

    deleteEvaluation(evaluation_id: number) {
        this.resultatService.supprimerEvaluation(evaluation_id);
        console.log("Deleting evaluation #" + evaluation_id);

    }

    modifierEvaluation(evaluation_id: number) {
        this.resultatService.modifierGrilleevaluation(evaluation_id);
        console.log("Modifying evaluation #" + evaluation_id);

    }

}
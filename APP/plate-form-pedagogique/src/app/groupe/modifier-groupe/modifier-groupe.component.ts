import {Component, OnInit} from '@angular/core';
import {GroupeService} from "../service/groupe.service";
import {Groupe} from "../groupe";

@Component({
    selector: 'app-modifier-groupe',
    templateUrl: './modifier-groupe.component.html',
    styleUrls: ['./modifier-groupe.component.css'],
    providers: [GroupeService]
})
export class ModifierGroupeComponent implements OnInit {
    groupes: Groupe [];

    constructor(private groupeService: GroupeService) {
        this.groupeService.getGroupes()
            .subscribe(groupes => {
                this.groupes = groupes;
            });
    }

    updateGroupe(groupe: Groupe) {
        var _groupe: Groupe = {
            _id: groupe._id,
            nom: groupe.nom,
            date_fin: groupe.date_fin,
            actif: groupe.actif,
            est_publique: groupe.est_publique,
            commenter: groupe.commenter,
            super_admins: groupe.super_admins,
            admins: groupe.admins,
            programmes: groupe.programmes,
            classes: groupe.classes,
            types: groupe.types,
            proprietaire: groupe.proprietaire,
            utilisateurs: groupe.utilisateurs,
            blacklist: groupe.blacklist,
            description: groupe.description
        };

        this.groupeService.updateGroupe(_groupe).subscribe(data => {
            //
        })
    }

    ngOnInit() {
    }

}

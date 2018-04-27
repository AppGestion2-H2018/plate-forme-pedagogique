import {Component, OnInit} from '@angular/core';
import {GroupeService} from '../service/groupe.service';
import {Groupe} from '../groupe';
import {Type} from '../type';
import {Programme} from '../programme';

@Component({
    selector: 'app-creer-groupe',
    templateUrl: './creer-groupe.component.html',
    styleUrls: ['./creer-groupe.component.css'],
    providers: [GroupeService]
})
export class CreerGroupeComponent implements OnInit {

    groupes: Groupe[];
    types: Type[];
    programmes: Programme[];
    // groupe : Groupe;
    groupe = {
        _id:"",
        proprietaire:"5acd550bd2d9763634a93f6f",
        nom:"NOEL NOEL NOEL NOEL NOEL NOEL NOEL NOEL NOEL NOEL NOEL NOEL",
        actif:true,
        est_publique:true,
        commenter:true,
        date_fin: new Date("2018-12-28"),
        super_admin:1,
        admin:1,
        programmes:[122],
        classes:[122],
        type:[11212],
        utilisateur:[2323],
        blacklist:[1212]
    }

    constructor(private groupeService: GroupeService) {}

    getGroupes(): void {
        this.groupeService.getGroupes()
            .subscribe(groupes => this.groupes = groupes);
    }

    getTypes(): void {
        this.groupeService.getTypes()
            .subscribe(types => this.types = types);
    }

    getProgrammes(): void {
        this.groupeService.getProgrammes()
            .subscribe(programmes => this.programmes = programmes);
    }

    addGroupe(event: any) {
        event.preventDefault();

        this.groupeService.addGroupe(this.groupe)
            .subscribe();
    }

    ngOnInit() {
        console.log('in ngOnInit');
        this.getGroupes();
        this.getTypes();
        this.getProgrammes();
        this.addGroupe(this.groupe);
    }

}

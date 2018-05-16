import { Component, OnInit } from '@angular/core';
import {Publication} from "../publication";
import { PublicationService } from '../publication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms'
import {Observable} from 'rxjs/Observable';
import { catchError, map, tap,startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
import {rootRoute} from "@angular/router/src/router_module";
import {AppPage} from "../../../../e2e/app.po";

@Component({
    selector: 'app-modification-publication',
    templateUrl: './modification-publication.component.html',
    styleUrls: ['./modification-publication.component.css']
})
export class ModificationPublicationComponent implements OnInit {

    publications: Publication[];
    publication:Publication;
    selectedPublication: Publication;
    displayedColumns = ['id', 'auteur'];
    myControl = new FormControl();

    constructor(private publicationService: PublicationService , private route: ActivatedRoute , private router: Router) { }

    ngOnInit(): void {
        this.getPublications();
    }

    getPublications(): void {
        const id:string = this.route.snapshot.paramMap.get('id');
        this.publicationService.getPublicationParId(id)
            .subscribe(publications => this.publications = publications);
    }

    /*getPublication(): void {
        const id:string = this.route.snapshot.paramMap.get('id');
        console.log('Modification : ' + this.publicationService.getPublication());
        this.publicationService.getPublication()
            .subscribe(publication => publication);
    }*/

    modifier(){
        this.publications[0].titre =  ((document.getElementById("titre") as HTMLInputElement).value);
        this.publications[0].contenu =  ((document.getElementById("contenu") as HTMLInputElement).value);
        const date = ((document.getElementById("date_remise") as HTMLInputElement).value);
        this.publications[0].date_remise = new Date(date);

        this.publications[0].contenu =  ((document.getElementById("contenu") as HTMLInputElement).value);
        //Demande au service!
        this.publicationService.updatePublication(this.publications[0]).subscribe();
        console.log(  this.publications[0]);
    }
}

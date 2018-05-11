import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilisateurService} from './service/utilisateur.service';
import {FormControl} from '@angular/forms';
import {EvenementService} from './evenement/evenement.service';
import {AuthHttpInterceptor} from "./service/auth.interceptor";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [EvenementService, UtilisateurService]
})

export class AppComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private cookieService: CookieService) {
        this.estConnecte = cookieService.get('auth_da') !== "null" && cookieService.get('auth_da') !== "";
    }

    ngOnInit(): void {
        AuthHttpInterceptor.onConnectionChanged.subscribe(valeurBool => {
            //this.estConnecte = valeurBool;
            this.estConnecte = true;
        });
        console.log('noOnInit fonctionne !!');
        console.log(this.route.url);
    }

    ngOnDestroy(): void {
        AuthHttpInterceptor.onConnectionChanged.unsubscribe();
    }

    estConnecte = true;
    aLesDroitsDacces = true;

    title = 'Plate-forme pédagogique H2018';
    tiles = [
        {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
}

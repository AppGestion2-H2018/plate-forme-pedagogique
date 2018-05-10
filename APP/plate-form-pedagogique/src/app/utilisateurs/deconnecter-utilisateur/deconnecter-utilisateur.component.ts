import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: 'app-deconnecter-utilisateur',
    templateUrl: './deconnecter-utilisateur.component.html',
    styleUrls: ['./deconnecter-utilisateur.component.css']
})
export class DeconnecterUtilisateurComponent implements OnInit {

    constructor(private cookieService: CookieService) {
    }

    ngOnInit() {
    }

    onClick(): void {
        console.info("Déconnection!");
        this.cookieService.set('auth_token', 'null');
        this.cookieService.set('auth_da', 'null');
        this.cookieService.set('auth_id', 'null');
        window.location.reload();
    }

}

import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent,
    HttpErrorResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CookieService} from "ngx-cookie-service";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/add/operator/do'

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {
    }

    static onConnectionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    // Intercepte toutes les requêtes en envoie et sa réponse
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Ajoute le cookie DA dans la requête
        // Ajoute le cookie TOKEN dans la requête
        const newRequest = req.clone({
            setHeaders: {
                auth_da: this.cookieService.get('auth_da'),
                auth_token: this.cookieService.get('auth_token'),
                auth_id: this.cookieService.get('auth_id'),
            }
        });

        return next.handle(newRequest).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.headers.get('auth_xsrf_protection') === 'auth_xsrf_token') {
                    if (event.headers.get('auth_xsrf_success') === 'true') {
                        // Obtiens les nouveaux cookies dans les headers personnalisé
                        const da = event.headers.get('auth_da');
                        const token = event.headers.get('auth_token');
                        const id = event.headers.get('auth_id');

                        // Définie les nouveaux cookies de connexions
                        this.cookieService.set('auth_da', da, 30, "/");
                        this.cookieService.set('auth_token', token, 30, "/");
                        this.cookieService.set('auth_id', id, 30, "/");

                        AuthHttpInterceptor.onConnectionChanged.emit(this.cookieService.get('auth_token') !== 'null');
                    } else {
                        // Est déconnecté!
                        this.cookieService.set('auth_da', 'null');
                        this.cookieService.set('auth_token', 'null');
                        this.cookieService.set('auth_id', 'null');
                        AuthHttpInterceptor.onConnectionChanged.emit(this.cookieService.get('auth_token') !== 'null');
                    }
                }
            }

            // Continue l'exécution du code.
            return event;
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // redirection vers la page de login
                    // ou faire autre chose....
                    console.log("PAS AUTORISÉ!");
                }
            }
        });

        //return next.handle(newRequest);
    }
}
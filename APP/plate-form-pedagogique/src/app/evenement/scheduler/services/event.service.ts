import {Injectable} from '@angular/core';
import {Event} from '../../models/event';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './service-helper';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {

    private getEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';
    private addEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements/ajout';
    private updateEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';
    private deleteEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';

    constructor(private http: HttpClient) {
    }

    get(): Promise<Event[]> {
        return this.http.get(this.getEventUrl)
            .toPromise()
            .catch(HandleError);
    }

    insert(event: Event): Promise<Event> {
        event.active = true;
        event.description = event.text;
        event.categorie = "1";
        event.type = "Prive";
        event.group_id = "";
        event.admin_id = "1";
        console.log(event);

        return this.http.post(this.addEventUrl, event)
            .toPromise()
            .catch(HandleError);
    }

    update(event: Event): Promise<void> {
        event.active = event.active;
        event.description = event.text;
        event.categorie = event.categorie;
        event.type = event.type;
        event.group_id = event.group_id;
        event.admin_id = event.admin_id;
        return this.http.put(`${this.updateEventUrl}/${event.id}`, event)
            .toPromise()
            .catch(HandleError);
    }

    remove(id: number): Promise<void> {
        return this.http.delete(`${this.deleteEventUrl}/${id}`)
            .toPromise()
            .catch(HandleError);
    }

}

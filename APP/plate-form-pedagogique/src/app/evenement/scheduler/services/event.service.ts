import {Injectable} from '@angular/core';
import {Event} from '../../models/event';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './service-helper';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {

    // private getEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';
    // private addEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements/ajout';
    // private updateEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';
    // private deleteEventUrl = 'https://api-appgestion2-h18.herokuapp.com/api/evenements';
    private getEventUrl = 'http://localhost:3000/api/evenements';
    private addEventUrl = 'http://localhost:3000/api/evenements/ajout';
    private updateEventUrl = 'http://localhost:3000/api/evenements';
    private deleteEventUrl = 'http://localhost:3000/api/evenements';

    constructor(private http: HttpClient) {
    }

    get(): Promise<Event[]> {
        return this.http.get(this.getEventUrl)
            .toPromise()
            .catch(HandleError);
    }

    insert(event: Event): Promise<Event> {
        if(event.description != "" ) {
            event.active = true;
            event.description = event.text;
            event.categorie = "1";
            event.type = "Prive";
            event.group_id = "";
            event.admin_id = "1";

            return this.http.post(this.addEventUrl, event)
                .toPromise()
                .catch(HandleError);
        }
        else{
            return null;
        }
    }

    update(event: Event): Promise<void> {
        let newEvent = new Event();
        newEvent.active = event.active;
        newEvent.description = event.text;
        newEvent.categorie = event.categorie;
        newEvent.type = event.type;
        newEvent.group_id = event.group_id;
        newEvent.admin_id = event.admin_id;
        return this.http.put(`${this.updateEventUrl}/${event._id}`,newEvent)
            .toPromise()
            .catch(HandleError);
    }

    remove(id: number): Promise<void> {
        console.log(id);
        return this.http.delete(`${this.deleteEventUrl}/${id}`)
            .toPromise()
            .catch(HandleError);
    }
}

import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";
import {EventService} from '../scheduler/services/event.service';
import {Event} from '../models/Event';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css'],
    providers: [ EventService ]
})

export class SchedulerComponent implements OnInit {

    @ViewChild("scheduler_here") schedulerContainer: ElementRef;

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        scheduler.config.xml_date = '%Y-%m-%d %H:%i';

        scheduler.init(this.schedulerContainer.nativeElement, new Date(2018, 4, 1));

        scheduler.attachEvent('onEventAdded', (id, ev) => {
            this.eventService.insert(this.serializeEvent(ev, true))
                .then((response) => {
                    if (response._id !== id) {
                        scheduler.changeEventId(id, response._id);
                    }
                });
        });

        scheduler.attachEvent('onEventChanged', (id, ev) => {
            this.eventService.update(ev);
        });

        scheduler.attachEvent('onEventDeleted', (id,ev) => {
            this.eventService.remove(ev._id);
        });

        this.eventService.get()
            .then((data) => {
                scheduler.parse(data, 'json');
            });
    }

    private serializeEvent(data: any, insert: boolean = false): Event {
        const result = {};

        for (let i in data) {
            if (i.charAt(0) === '$' || i.charAt(0) === '_') {
                continue;
            }
            if (insert && i === 'id') {
                continue;
            }
            if (data[i] instanceof Date) {
                result[i] = scheduler.templates.xml_format(data[i]);
            } else {
                result[i] = data[i];
            }
        }
        console.log(result);
        return result as Event;
    }
}

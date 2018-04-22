import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";
// import {EventService} from '../services/event.service';
// import {Event} from '../../models/Event';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

    @ViewChild("scheduler_here") schedulerContainer: ElementRef;

    constructor() {
    }

    ngOnInit() {
        scheduler.config.xml_date = '%Y-%m-%d %H:%i';

        scheduler.init(this.schedulerContainer.nativeElement, new Date(2018, 4, 1));
    }

}

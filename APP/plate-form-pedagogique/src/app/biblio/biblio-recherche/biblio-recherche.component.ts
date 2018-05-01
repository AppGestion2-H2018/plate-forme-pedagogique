import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-biblio-recherche',
  templateUrl: './biblio-recherche.component.html',
  styleUrls: ['./biblio-recherche.component.css']
})
export class BiblioRechercheComponent implements OnInit {

    recherche: string;
    @Input() rechercheEnfant: string;
    @Output() rechercheOutputEvent: EventEmitter<String> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log('in ngOnInit');
    }

    updateRecherche() {
        console.log("test");
        this.rechercheOutputEvent.emit(this.recherche);
    }
}

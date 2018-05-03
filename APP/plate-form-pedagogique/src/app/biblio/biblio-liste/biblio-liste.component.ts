import {Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {BiblioService} from "../../service/biblio.service";
import {Livre} from "../../class/livre";
import {Biblio} from "../../class/biblio";

@Component({
  selector: 'app-biblio-liste',
  templateUrl: './biblio-liste.component.html',
  styleUrls: ['./biblio-liste.component.css']
})
export class BiblioListeComponent implements OnInit, OnChanges {

    selected: Livre;
    biblio: Biblio;
    @Input() rechercheEnfant: string;
    @Output() selectedOutputEvent: EventEmitter<Livre> = new EventEmitter();

    constructor(private biblioService: BiblioService) { }

    onSelect(livre: Livre): void {
        this.selected = livre;
        this.selectedOutputEvent.emit(this.selected);
    }

    getLivres(recherche: string): void {
        this.biblioService.getLivres('https://www.googleapis.com/books/v1/volumes?q=' + recherche)
            .subscribe(resultat => this.biblio = resultat);
        console.log('in ngOnInit');
    }

    ngOnInit() {
        this.biblio = new Biblio();
        console.log('in ngOnInit');
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getLivres(changes.rechercheEnfant.currentValue);
    }
}

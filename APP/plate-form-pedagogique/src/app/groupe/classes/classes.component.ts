import { Component, OnInit } from '@angular/core';
import {ClasseService} from '../service/classe.service';
import {Classe} from "../classe";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
    providers: [ClasseService]
})
export class ClassesComponent implements OnInit {

    classes: Classe[];
    constructor(private classeService: ClasseService) {}

    getClasses(): void {
        this.classeService.getClasses()
            .subscribe(classes => this.classes = classes);
    }

  ngOnInit() {
        console.log('onInit');
      this.getClasses();
  }

}

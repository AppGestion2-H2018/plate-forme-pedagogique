import { Component, OnInit } from '@angular/core';
import { Classe } from '../classe';
import { CLASSES } from '../mock_classe';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
	
	classes = CLASSES;
	
  constructor() { }

  ngOnInit() {
  }

}

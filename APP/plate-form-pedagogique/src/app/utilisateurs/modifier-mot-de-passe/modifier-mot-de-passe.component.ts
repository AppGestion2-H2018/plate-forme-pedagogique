import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-mot-de-passe',
  templateUrl: './modifier-mot-de-passe.component.html',
  styleUrls: ['./modifier-mot-de-passe.component.css']
})
export class ModifierMotDePasseComponent implements OnInit {

  resetPasswordToken: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.resetPasswordToken = this.route.snapshot.paramMap.get('resetPasswordToken');
  }

  validerToken(): void {
    
  }

}

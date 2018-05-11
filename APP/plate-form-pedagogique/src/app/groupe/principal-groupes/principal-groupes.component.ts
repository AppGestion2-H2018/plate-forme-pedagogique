import { Component, OnInit, Input } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-principal-groupes',
  templateUrl: './principal-groupes.component.html',
  styleUrls: ['./principal-groupes.component.css']
})
export class PrincipalGroupesComponent implements OnInit {

  userId: string;

  constructor(private cookiService : CookieService) {
      this.userId = this.cookiService.get("auth_id");
  }

  ngOnInit() {

  }

}

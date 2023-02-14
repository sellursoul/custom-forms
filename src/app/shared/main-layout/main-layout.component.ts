import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../login-page/services/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor( private router: Router, private auth: AuthService) {
  }

  login() {
    this.router.navigate(['/login'])
  }

}

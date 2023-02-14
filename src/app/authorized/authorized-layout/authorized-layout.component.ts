import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../login-page/services/auth.service";

@Component({
  selector: 'app-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss']
})
export class AuthorizedLayoutComponent {
  constructor(private router: Router, public auth: AuthService) {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {isAuthenticated} from "../../auth/state/auth.selector";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {Observable} from "rxjs";
import {autoLogin, logout} from "../../auth/state/auth.actions";
import {getLoading} from "../../store/shared/shared.selector";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  isAuthenticated$: Observable<boolean>

  constructor(private router: Router, private store: Store<State>) {

  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(isAuthenticated)
    this.store.dispatch(autoLogin())
  }

  logout(event: Event) {
    event.preventDefault()
    this.store.dispatch(logout())
  }

}

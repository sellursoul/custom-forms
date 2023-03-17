import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {loginStart} from "../state/auth.actions";
import {setLoadingSpinner} from "../../store/shared/shared.actions";
import {Observable} from "rxjs";
import {getErrorMessage} from "../../store/shared/shared.selector";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../style/auth.scss']
})
export class LoginPageComponent implements OnInit {

  logInfForm: FormGroup
  message: string
  errorMessage$: Observable<string>

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.errorMessage$ = this.store.select(getErrorMessage)
    this.logInfForm = new FormGroup({
      email: new FormControl
      (null, [Validators.required, Validators.email]),
      password: new FormControl
      (null, [Validators.required, Validators.minLength(8)])
    })
  }

  submit() {
    if (this.logInfForm.invalid) return
    const email = this.logInfForm.value.email;
    const password = this.logInfForm.value.password;
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(loginStart({email, password}));
  }
}

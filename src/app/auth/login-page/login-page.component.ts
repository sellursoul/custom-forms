import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
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

  logInForm: FormGroup
  message: string
  hide = true
  errorMessage$: Observable<string>

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.errorMessage$ = this.store.select(getErrorMessage)
    this.logInForm = new FormGroup({
      email: new FormControl
      (null, [Validators.required, Validators.email]),
      password: new FormControl
      (null, [Validators.required, Validators.minLength(8)])
    })
  }

  getEmailErrorMessage() {
    if (this.logInForm.get('email').hasError('required')) {
      return 'Please, enter email';
    }
    return this.logInForm.get('email').hasError('email') ? 'Please, enter correct email' : '';
  }

  getPasswordErrorMessage() {
    if (this.logInForm.get('password').hasError('required')) {
      return 'Please, enter password';
    }
    return this.logInForm.get('password').hasError('minlength') ? `Minimal password length 8 symbols` : '';
  }

  submit() {
    if (this.logInForm.invalid) return
    const email = this.logInForm.value.email;
    const password = this.logInForm.value.password;
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(loginStart({email, password}));
  }
}

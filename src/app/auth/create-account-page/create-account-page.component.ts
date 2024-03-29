import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {signUpStart} from "../state/auth.actions";
import {setLoadingSpinner} from "../../store/shared/shared.actions";
import {Observable} from "rxjs";
import {getErrorMessage} from "../../store/shared/shared.selector";

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.scss', '../style/auth.scss']
})
export class CreateAccountPageComponent implements OnInit {

  signUpForm: FormGroup
  errorMessage$: Observable<string>

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.errorMessage$ = this.store.select(getErrorMessage)
    this.signUpForm = this.formBuilder.group(
      {
        email: new FormControl(null, [Validators.email, Validators.required]),
        password:  new FormControl(null, [Validators.minLength(8), Validators.required]),
        repeatPassword: new FormControl(null, [Validators.required])
      },
      {
        validator: this.matchValidator('password', 'repeatPassword')
      })
  }

  getEmailErrorMessage() {
    if (this.signUpForm.get('email').hasError('required')) {
      return 'Please, enter email';
    }
    return this.signUpForm.get('email').hasError('email') ? 'Please, enter correct email' : '';
  }

  getPasswordErrorMessage() {
    if (this.signUpForm.get('password').hasError('required')) {
      return 'Please, enter password';
    }
    return this.signUpForm.get('password').hasError('minlength') ? `Minimal password length 8 symbols` : '';
  }

  getRepeatPasswordErrorMessage() {
    if (this.signUpForm.get('repeatPassword').hasError('required')) {
      return 'Please, repeat password';
    }
    return this.signUpForm.get('repeatPassword').hasError('matchValidator') ? 'Passwords don`t match' : '';
  }

  submit() {
    if (this.signUpForm.invalid) return
    const email = this.signUpForm.value.email
    const password = this.signUpForm.value.password

    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(signUpStart({email, password}))
  }

  matchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({matchValidator: true})
      } else {
      matchingControl.setErrors(null)
      }
    }
  }
}

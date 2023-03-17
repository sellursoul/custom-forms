import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {signUpStart} from "../state/auth.actions";
import {setLoadingSpinner} from "../../store/shared/shared.actions";
import {AuthService} from "../services/auth.service";
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
    public auth: AuthService,
    private router: Router,
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

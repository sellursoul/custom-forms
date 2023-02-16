import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/interfaces";
import {RegistrationService} from "../services/registration.service";

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.scss']
})
export class CreateAccountPageComponent implements OnInit {

  form: FormGroup
  submitted = false

  constructor(
    public register: RegistrationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
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
    if (this.form.invalid) return
    this.submitted = true
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.register.signUp(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/login'])
      this.submitted = false
    }, () => this.submitted = false)
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

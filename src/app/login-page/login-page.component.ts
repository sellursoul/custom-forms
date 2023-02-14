import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../shared/interfaces";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: any
  submitted = false
  message: string


  constructor(private router: Router, private route: ActivatedRoute, public auth: AuthService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'Enter the authorization data'
      }
    })
    this.form = new FormGroup({
      email: new FormControl
      (null, [Validators.required, Validators.email]),
      password: new FormControl
      (null, [Validators.required, Validators.minLength(8)])
    })
  }

  submit() {
    if (this.form.invalid) return
    this.submitted = true
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['authorized', 'formbuilder'])
      this.submitted = false
    }, () => this.submitted = false)
  }
}

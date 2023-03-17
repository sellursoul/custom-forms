import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {CreateAccountPageComponent} from "./create-account-page/create-account-page.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {AUTH_STATE_NAME} from "./state/auth.selector";
import {AuthReducer} from "./state/auth.reducer";
import {PushModule} from "@ngrx/component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'signup', component: CreateAccountPageComponent},
    ]
  }
]

@NgModule({
  declarations:[
    LoginPageComponent,
    CreateAccountPageComponent
  ],
  imports: [CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    PushModule
  ],
  exports: [RouterModule],
  providers:[]
})
export class AuthModule {
}

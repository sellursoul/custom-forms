import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthorizedLayoutComponent} from "./authorized-layout/authorized-layout.component";
import {FormBuilderComponent} from "./form-builder/form-builder.component";
import {AuthGuard} from "./services/auth.guard";

@NgModule({
  declarations: [
    AuthorizedLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AuthorizedLayoutComponent, children: [
          {path: 'formbuilder', component: FormBuilderComponent, canActivate: [AuthGuard]}
        ]}
    ])
  ],
  exports: [RouterModule],
  providers:[AuthGuard]
})

export class AuthorizedModule {
}

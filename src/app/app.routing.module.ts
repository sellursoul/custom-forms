import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {FormBuilderComponent} from "./form-builder/form-builder-component/form-builder.component";
import {AuthGuard} from "./auth/services/auth.guard";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {path: 'formbuilder', component: FormBuilderComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: '/'}
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

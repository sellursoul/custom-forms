import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";

const routes: Routes = [
  {path:'', component: MainLayoutComponent, children:[
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent}
    ]},
  {path: 'authorized',
    loadChildren: () => import('./authorized/authorized.module').then(m => m.AuthorizedModule)},
  {path: 'login', component: LoginPageComponent},
  {path: '**', redirectTo:'/'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

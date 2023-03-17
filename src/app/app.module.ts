import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app.routing.module";
import {HomePageComponent} from "./home-page/home-page.component";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './store';
import {HttpClientModule} from "@angular/common/http";
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {EffectsModule} from "@ngrx/effects";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {AuthEffects} from "./auth/state/auth.effects";
import {PushModule} from "@ngrx/component";
import {FormBuilderModule} from "./form-builder/form-builder.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainLayoutComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FormBuilderModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({logOnly: !isDevMode()}),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    PushModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

/*{provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}*/

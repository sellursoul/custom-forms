import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {autoLogin, loginStart, loginSuccess, logout, signUpStart, signUpSuccess} from "./auth.actions";
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {setErrorMessage, setLoadingSpinner} from "../../store/shared/shared.actions";
import {Router} from "@angular/router";

@Injectable()

export class AuthEffects {

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private store: Store<State>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(loginStart),
        exhaustMap((action) => {
          return this.auth.login(action.email, action.password)
            .pipe(
              map((data) => {
                this.store.dispatch(setLoadingSpinner({status: false}))
                const user = this.auth.formatUser(data)
                this.auth.setUserInLocalStorage(user)
                return loginSuccess({user, redirect: true})
              }),
              catchError(errResp => {
                this.store.dispatch(setLoadingSpinner({status: false}))
                const errorMessage = this.auth.getErrorMessage(errResp.error.error.message)
                return of(setErrorMessage({message: errorMessage}))
              })
            )
        })
      )
  })

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSuccess, signUpSuccess]),
      map(action => {
        this.store.dispatch(setErrorMessage({message: ''}))
        if (action.redirect) {
          this.router.navigate(['/formbuilder'])
        }
      })
    )
  }, {dispatch: false})

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        return this.auth.signUp(action.email, action.password)
          .pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({status: false}))
              const user = this.auth.formatUser(data)
              this.auth.setUserInLocalStorage(user)
              return signUpSuccess({user, redirect: true})
            }),
            catchError(errResp => {
              this.store.dispatch(setLoadingSpinner({status: false}))
              const errorMessage = this.auth.getErrorMessage(errResp.error.error.message)
              return of(setErrorMessage({message: errorMessage}))
            })
          )
      })
    )
  })

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      switchMap( () => {
        const user = this.auth.getUserFromLocalStorage();
        return of(loginSuccess({user, redirect: true}))
      })
    )}
  )

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      map( () => {
        this.auth.logout();
        this.router.navigate(['/'])
      })
    )
  }, {dispatch: false})
}


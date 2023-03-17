import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {isAuthenticated} from "../state/auth.selector";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<State>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(isAuthenticated).pipe(
      map((authenticate) => {
        if (!authenticate) {
          return this.router.createUrlTree(['/auth', 'login']);
        }
        return true;
      })
    )
  }
}

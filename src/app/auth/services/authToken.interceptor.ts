/*
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {getToken} from "../state/auth.selector";
import {Router} from "@angular/router";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<State>, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(req)
        }
        let modifRequest = req.clone({
          params: req.params.append('auth', token),
        });
        return next.handle(modifRequest)
      })
    )
  }

}

*/

import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../shared/interfaces";
import {environment} from "../../shared/environment";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";

@Injectable({providedIn: 'root'})

export class RegistrationService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  signUp(user: User): Observable<any> {
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error
    const errorMessages = {
      EMAIL_EXISTS: 'The email address is already in use by another account',
      OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
      TOO_MANY_ATTEMPTS_TRY_LATER:'We have blocked all requests from this device due to unusual activity. Try again later.'
    }
    this.error$.next(errorMessages[message])
    return throwError(error)
  }
}

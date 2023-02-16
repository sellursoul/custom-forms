import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../shared/environment";
import {AuthResponse, User} from "../../shared/interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";

@Injectable({providedIn: 'root'})

export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('exp-fb-token'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error
    const errorMessages = {
      INVALID_EMAIL: 'The email address is already in use by another account',
      INVALID_PASSWORD: 'Password sign-in is disabled for this project.',
      EMAIL_NOT_FOUND:'We have blocked all requests from this device due to unusual activity. Try again later.'
    }
    this.error$.next(errorMessages[message]);
    return throwError(error)
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('exp-fb-token', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

}

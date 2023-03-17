import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../shared/environment";
import {AuthResponse} from "../../shared/interfaces";
import {Observable} from "rxjs";
import {UserModel} from "../../shared/models/user.model";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {logout} from "../state/auth.actions";

@Injectable({providedIn: 'root'})

export class AuthService {

  timeOutInterval: number

  constructor(private http: HttpClient, private store: Store<State>) {
  }


  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        {email, password, returnSecureToken: true})
  }
  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        {email, password, returnSecureToken: true})
  }

  formatUser(data: AuthResponse) {
    const expDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    return new UserModel(
      data.email,
      data.idToken,
      data.localId,
      expDate);
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'INVALID_PASSWORD':
        return 'The password or email is invalid.';
      case 'EMAIL_NOT_FOUND':
        return 'There is no user record corresponding to this identifier. The user may have been deleted.';
      case 'USER_DISABLED' :
        return 'The user account has been disabled by an administrator.'
      case 'EMAIL_EXISTS' :
        return 'The email address is already in use by another account.'
      case 'TOO_MANY_ATTEMPTS_TRY_LATER' :
        return 'We have blocked all requests from this device due to unusual activity. Try again later.'
      default:
        return 'Unknown error occur. Please try again.'
    }
  }

  setUserInLocalStorage(user: UserModel) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeOutInterval(user)
  }

  runTimeOutInterval (user: UserModel) {
    const todayDate = new Date().getTime();
    const expDate = user.expireDate.getTime();
    const timeInterval = expDate - todayDate;

    this.timeOutInterval =  setTimeout(() => {
      this.store.dispatch(logout())
    }, timeInterval)
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData')
    if (userDataString) {
      const userData = JSON.parse(userDataString)
      const expirationDate = new Date(userData.expirationDate)
      const user = new UserModel(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate)
      this.runTimeOutInterval(user)
      return user
    }
    return null
  }

  logout() {
    localStorage.removeItem('userData')
    if (this.timeOutInterval) {
      clearTimeout(this.timeOutInterval);
      this.timeOutInterval = null;
    }
  }
}

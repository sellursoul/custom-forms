import {AuthService} from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {AuthReducer} from "../state/auth.reducer";
import {AuthResponse} from "../../shared/interfaces";
import {environment} from "src/app/shared/environment";
import {UserModel} from "../../shared/models/user.model";
import { logout } from "../state/auth.actions";

describe('Auth Service', () => {
  let service: AuthService
  let httpMock: HttpTestingController
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Store', ['dispatch']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({auth: AuthReducer}),
      ],
      providers: [AuthService, { provide: Store, useValue: spy }]
    })

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  })

  afterEach(() => {
    httpMock.verify()
    localStorage.removeItem('userData')
  })

  describe('Log in Func', () => {
    it('should send a POST req to the server to log in', fakeAsync(() => {
      const mockResponse: AuthResponse = {
        email: 'test@test.com',
        idToken: 'mock-id-token',
        localId: 'mock-local-id',
        expiresIn: '3600'
      };

      const email = 'test@test.com'
      const password = 'testpassword'

      service.login(email, password).subscribe((response) => {
        expect(response).toEqual(mockResponse)
      })
      const req = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`);
      expect(req.request.method).toBe('POST');

      req.flush(mockResponse);
    }))

    it('should return an error message when INVALID_PASSWORD error is returned from the API', fakeAsync(() => {
      const mockError = {error: {error: {message: 'INVALID_PASSWORD'}}}

      const email = 'test@test.com'
      const password = 'testpassword'

      service.login(email, password).subscribe(() => {
        },
        (error) => {
          expect(error).toBe('The password or email is invalid.')
        })

      const req = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({email, password, returnSecureToken: true})

      req.flush(mockError)
      tick()
    }))
    it('should return an error message when EMAIL_NOT_FOUND error is returned from the API', fakeAsync(() => {
      const mockError = {error: {error: {message: 'EMAIL_NOT_FOUND'}}}

      const email = 'test@test.com'
      const password = 'testpassword'

      service.login(email, password).subscribe(() => {
        },
        (error) => {
          expect(error).toBe('There is no user record corresponding to this identifier. The user may have been deleted.')
        })

      const req = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({email, password, returnSecureToken: true})

      req.flush(mockError)
      tick()
    }))
    it('should return an error message when USER_DISABLED error is returned from the API', fakeAsync(() => {
      const mockError = {error: {error: {message: 'USER_DISABLED'}}}

      const email = 'test@test.com'
      const password = 'testpassword'

      service.login(email, password).subscribe(() => {
        },
        (error) => {
          expect(error).toBe('The user account has been disabled by an administrator.')
        })

      const req = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({email, password, returnSecureToken: true})

      req.flush(mockError)
      tick()
    }))
  })

  describe('Sign Up Func', () => {
    it('should send a POST req to the server to sign up ', fakeAsync (() => {
      const mockResponse: AuthResponse = {
        email: 'test@test.com',
        idToken: 'mock-id-token',
        localId: 'mock-local-id',
        expiresIn: '3600',
        refreshToken: 'testRefreshToken',
        registered: true,
      }

      const email = 'test@test.com';
      const password = 'testpassword';

      service.signUp(email, password).subscribe((response) => {
        expect(response).toEqual(mockResponse)
      })

      const  req = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({email, password, returnSecureToken: true})

      req.flush(mockResponse)
      tick()
    }));

    it('should return an error message when EMAIL_EXISTS error is returned from the API', fakeAsync(() => {
      const mockError = {error: {error: {message: 'EMAIL_EXISTS'}}}

      const email = 'test@test.com'
      const password = 'testpassword'

      service.signUp(email, password).subscribe(() => {
        },
        (error) => {
          expect(error).toBe('The email address is already in use by another account.')
        })

      const req = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({email, password, returnSecureToken: true})

      req.flush(mockError)
      tick()
    }))
    it('should return an error message when TOO_MANY_ATTEMPTS_TRY_LATER error is returned from the API', fakeAsync(() => {
      const mockError = {error: {error: {message: 'TOO_MANY_ATTEMPTS_TRY_LATER'}}}

      const email = 'test@test.com'
      const password = 'testpassword'

      service.signUp(email, password).subscribe(() => {
        },
        (error) => {
          expect(error).toBe('We have blocked all requests from this device due to unusual activity. Try again later.')
        })

      const req = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({email, password, returnSecureToken: true})

      req.flush(mockError)
      tick()
    }))
  })

  describe('user data from Local Storage', () => {
    it('should return null if the user data doesnt exist in local storage',  () => {
      const user = service.getUserFromLocalStorage()
      expect(user).toBeNull()
    })

    it('should return a user model with correct data if user data exist in the local storage',  () => {
      const expirationDate = new Date()
      expirationDate.setHours(expirationDate.getHours() + 1)

      const user = new UserModel('test@test.com', 'mock-id-token', 'mock-local-id', expirationDate)
      service.setUserInLocalStorage(user)

      const settedUser = service.getUserFromLocalStorage()
      expect(settedUser).toEqual(user)
    });

    it('should dispatch logout when time is out',  fakeAsync(() => {
      const user = new UserModel('test@test.com', 'mock-id-token', 'mock-local-id', new Date(Date.now() + 1000))

      service.runTimeOutInterval(user)

      expect(storeSpy.dispatch).not.toHaveBeenCalled();
      jasmine.clock().tick(1001)

      expect(storeSpy.dispatch).toHaveBeenCalledOnceWith(logout());
    }));
  })

})

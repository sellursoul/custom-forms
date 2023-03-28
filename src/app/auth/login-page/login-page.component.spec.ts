import {setLoadingSpinner} from "../../store/shared/shared.actions";
import {TestBed, ComponentFixture} from "@angular/core/testing";
import {loginStart} from "../state/auth.actions";
import {Observable, of} from "rxjs";
import { LoginPageComponent } from "./login-page.component";
import { Store, StoreModule } from "@ngrx/store";
import {State} from "../../store";
import { ReactiveFormsModule } from "@angular/forms";
import {ActivatedRoute, RouterModule, Routes} from "@angular/router";
import {PushModule} from "@ngrx/component";
import {CreateAccountPageComponent} from "../create-account-page/create-account-page.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: Store<State>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    const routes: Routes = [{
        path: '',
        children: [
          {path: 'login', component: LoginPageComponent},
          {path: 'signup', component: CreateAccountPageComponent},
        ]}]
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        RouterModule.forChild(routes),
        PushModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule, MatButtonModule, MatInputModule
      ],
      declarations: [ LoginPageComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } }}
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should dispatch setLoadingSpinner action on form submit', () => {
    component.logInForm.setValue({email: 'test@test.com', password: 'password'});
    component.submit();
    expect(dispatchSpy).toHaveBeenCalledWith(setLoadingSpinner({status: true}));
  });

  it('should dispatch login start and loading spinner when the form is submitted with valid data', () => {
    const email = 'test@test.com'
    const password = 'testpassword'

    component.logInForm.setValue({
      email,
      password
    })
    component.submit()

    expect(dispatchSpy.calls.all()[0].args[0].status).toBeTrue()
    expect(dispatchSpy.calls.all()[1].args[0].email).toBe(email)
    expect(dispatchSpy.calls.all()[1].args[0].password).toBe(password)
  })

  it('should dispatch loginStart action on form submit', () => {
    component.logInForm.setValue({email: 'test@test.com', password: 'password'});
    component.submit();
    expect(dispatchSpy).toHaveBeenCalledWith(loginStart({email: 'test@test.com', password: 'password'}));
  });

  it('should not dispatch any actions on form submit when form is invalid', () => {
    component.logInForm.setValue({email: '', password: ''});
    component.submit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  describe('getEmailErrorMessage', () => {
    it('should return "Please, enter email" if email control is empty', () => {
      component.logInForm.get('email').setValue('');
      expect(component.getEmailErrorMessage()).toBe('Please, enter email');
    });

    it('should return "Please, enter correct email" if email control is invalid', () => {
      component.logInForm.get('email').setValue('invalid-email');
      expect(component.getEmailErrorMessage()).toBe('Please, enter correct email');
    });

    it('should return empty string if email control is valid', () => {
      component.logInForm.get('email').setValue('test@example.com');
      expect(component.getEmailErrorMessage()).toBe('');
    });
  });

  describe('getPasswordErrorMessage', () => {
    it('should return "Please, enter password" if password control is empty', () => {
      component.logInForm.get('password').setValue('');
      expect(component.getPasswordErrorMessage()).toBe('Please, enter password');
    });

    it('should return "Minimal password length 8 symbols" if password control is too short', () => {
      component.logInForm.get('password').setValue('pass');
      expect(component.getPasswordErrorMessage()).toBe('Minimal password length 8 symbols');
    });

    it('should return empty string if password control is valid', () => {
      component.logInForm.get('password').setValue('testpassword');
      expect(component.getPasswordErrorMessage()).toBe('');
    });
  });


  it('should display error message when errorMessage$ emits a value', () => {
    const errorMessage = 'Invalid credentials';
    component.errorMessage$ = of(errorMessage)
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('.alert-danger');
    expect(errorElement.textContent).toContain(errorMessage);
  });

  it('should not display error message if errorMessage$ has no value', () => {
    component.errorMessage$ = of(null);
    fixture.detectChanges();
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement).toBeFalsy();
  });
});

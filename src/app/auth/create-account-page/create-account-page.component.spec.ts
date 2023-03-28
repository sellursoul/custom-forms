import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CreateAccountPageComponent} from "./create-account-page.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store, StoreModule} from "@ngrx/store";
import {ActivatedRoute, RouterModule, Routes} from "@angular/router";
import {PushModule} from "@ngrx/component";
import {LoginPageComponent} from "../login-page/login-page.component";
import {State} from "../../store";
import {signUpStart} from "../state/auth.actions";
import {of} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('Sign up page', () => {
  let component: CreateAccountPageComponent
  let fixture: ComponentFixture<CreateAccountPageComponent>;
  let store: Store<State>
  let dispatchSpy: jasmine.Spy

  beforeEach(async () => {
    const routes: Routes = [{
      path: '',
      children: [
        {path: 'login', component: LoginPageComponent},
        {path: 'signup', component: CreateAccountPageComponent},
      ]
    }]
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
      declarations: [CreateAccountPageComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {queryParams: {}}}}
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountPageComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    dispatchSpy = spyOn(store, 'dispatch')
    fixture.detectChanges()
  })

  it('should have sign up FormGroup ', () => {
    expect(component.signUpForm).toBeTruthy()
  });

  it('should dispatch signUpStart when submit is called with valid form', () => {
    component.signUpForm.setValue({email: 'test@test.com', password: 'testpassword', repeatPassword: 'testpassword'})
    component.submit()
    expect(dispatchSpy).toHaveBeenCalledWith(signUpStart({email: 'test@test.com', password: 'testpassword'}))
  })

  it('shouldn`t dispatch when the form is invalid ', () => {
    component.signUpForm.setValue({email: '', password: '', repeatPassword: ''})
    component.submit()
    expect(dispatchSpy).not.toHaveBeenCalled()
  });

  describe('getEmailErrorMessage', () => {
    it('should return required error message if the email field is empty', () => {
      component.signUpForm.get('email').setValue('');
      expect(component.getEmailErrorMessage()).toBe('Please, enter email');
    });

    it('should return email format error message if the email field is invalid', () => {
      component.signUpForm.get('email').setValue('invalid email');
      expect(component.getEmailErrorMessage()).toBe('Please, enter correct email');
    });

    it('should return empty string if there are no errors', () => {
      component.signUpForm.get('email').setValue('test@example.com');
      expect(component.getEmailErrorMessage()).toBe('');
    });
  });

  describe('getPasswordErrorMessage', () => {
    it('should return required error message if the password field is empty', () => {
      component.signUpForm.get('password').setValue('');
      expect(component.getPasswordErrorMessage()).toBe('Please, enter password');
    });

    it('should return minimum length error message if the password is too short', () => {
      component.signUpForm.get('password').setValue('short');
      expect(component.getPasswordErrorMessage()).toBe('Minimal password length 8 symbols');
    });

    it('should return empty string if there are no errors', () => {
      component.signUpForm.get('password').setValue('testpassword');
      expect(component.getPasswordErrorMessage()).toBe('');
    });
  });

  describe('getRepeatPasswordErrorMessage', () => {
    it('should return error message if repeatPassword control doesn`t match with password', () => {
      component.signUpForm.get('repeatPassword').setValue('1');
      component.signUpForm.get('password').setValue('testpassword');
      expect(component.getRepeatPasswordErrorMessage()).toBe('Passwords don`t match');
    });

    it('should return error message if repeatPassword control empty', () => {
      component.signUpForm.get('repeatPassword').setValue(null);
      expect(component.getRepeatPasswordErrorMessage()).toBe('')
    });

    it('should return empty string if repeatPassword control is valid', () => {
      component.signUpForm.get('repeatPassword').setValue('testpassword');
      component.signUpForm.get('password').setValue('testpassword');
      expect(component.getRepeatPasswordErrorMessage()).toBe('');
    });
  })

  it('should not display error message if errorMessage$ has no value', () => {
    component.errorMessage$ = of(null);
    fixture.detectChanges();
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement).toBeFalsy();
  });

  it('should validate passwords, if passwords don`t match result will be failed', () => {
    let formGroup: FormGroup
    formGroup = new FormGroup({
      password: new FormControl(),
      confirmPassword: new FormControl(),
    })
    formGroup.controls['password'].setValue('password')
    formGroup.controls['confirmPassword'].setValue('wrongpassword')

    const matchValidatorFn = component.matchValidator('password', 'confirmPassword');
    const result = matchValidatorFn(formGroup);
    expect(result).toBeFalsy()
  });

})

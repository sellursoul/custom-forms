import {MainLayoutComponent} from "./main-layout.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../store";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {PushModule} from "@ngrx/component";
import { Router } from "@angular/router";
import {autoLogin, logout} from "../../auth/state/auth.actions";

describe('MainLayout Component', () => {
  let component: MainLayoutComponent
  let fixture: ComponentFixture<MainLayoutComponent>
  let store: Store<State>
  let spySelect: jasmine.Spy
  let spyDispatch: jasmine.Spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        PushModule
      ]
    }).compileComponents()
  })


  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    spyDispatch = spyOn(store, 'dispatch')
    spySelect = spyOn(store, 'select')
    fixture.detectChanges()
  })

  it('should show Sign Up link when the user isn`t authenticated', () => {
    component.isAuthenticated$ = of(false)
    fixture.detectChanges()

    const signUpLink = fixture.debugElement.query(By.css('.sign_up'))
    expect(signUpLink).toBeTruthy()
  });

  it('should navigate to the form builder page', () => {
    const formBuilderLink = fixture.debugElement.query(By.css('.form_builder')).nativeElement;
    expect(formBuilderLink.textContent).toContain('Form builder');
    formBuilderLink.click();
    fixture.detectChanges();
    const currentPath = fixture.debugElement.injector.get(Router).url;
    expect(currentPath).toEqual('/');
  });

  it('should display a "Login" link when the user is not authenticated', () => {
    component.isAuthenticated$ = of(false);
    fixture.detectChanges();
    const loginLink = fixture.debugElement.query(By.css('.log_in'));
    expect(loginLink).toBeTruthy();
  });

  it('should display a "Logout" link when the user is authenticated', () => {
    component.isAuthenticated$ = of(true);
    fixture.detectChanges();
    const logoutLink = fixture.debugElement.query(By.css('.log_out'));
    expect(logoutLink).toBeTruthy();
  });

  it('should dispatch a logout action when the "Logout" link is clicked', () => {
    component.isAuthenticated$ = of(true)
    fixture.detectChanges()
    const logoutLink = fixture.debugElement.query(By.css('.log_out')).nativeElement;
    logoutLink.click();
    expect(spyDispatch).toHaveBeenCalledWith(logout());
  });

  it('should dispatch autoLogin on init', () => {
    component.ngOnInit()
    expect(store.dispatch).toHaveBeenCalledWith(autoLogin());
  });
})


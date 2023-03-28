import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store, StoreModule } from '@ngrx/store';
import {State} from "./store";
import {of} from "rxjs";
import {PushModule} from "@ngrx/component";
import {RouterTestingModule} from "@angular/router/testing";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";


describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let store: Store<State>
  let spySelect: jasmine.Spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoadingSpinnerComponent],
      imports: [
        StoreModule.forRoot({}),
        PushModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spySelect = spyOn(store, 'select')
    fixture.detectChanges();
  });

  it('should show loading spinner when loading is active', () => {
    const loading = true;
    component.showLoading = of(loading)
    fixture.detectChanges();

    const loadingSpinner = fixture.nativeElement.querySelector('app-loading-spinner');
    expect(loadingSpinner).not.toBeNull();
  });
});

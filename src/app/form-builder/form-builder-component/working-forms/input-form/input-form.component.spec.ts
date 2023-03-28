import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../../../store";
import {selectInputStyle} from "../../../state/builder.selectors";
import {PushModule} from "@ngrx/component";
import {InputTypes} from "../../../state/shared/builder.enum";
import {Form} from "../../../state/shared/builder.interfaces";
import {InputFormComponent} from "./input-form.component";
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe('InputForm Component', () => {
  let component: InputFormComponent
  let fixture: ComponentFixture<InputFormComponent>
  let store: Store<State>
  let spySelect: jasmine.Spy
  const mockForm: Form = { id: 1, inputType: InputTypes.Input };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFormComponent],
      imports: [
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        PushModule
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    spySelect = spyOn(store, 'select')
    component.item = mockForm
    fixture.detectChanges()
  })

  it('should set input styles', () => {
    component.ngOnInit();
    expect(spySelect).toHaveBeenCalledWith(selectInputStyle, { id: mockForm.id });
  });
})

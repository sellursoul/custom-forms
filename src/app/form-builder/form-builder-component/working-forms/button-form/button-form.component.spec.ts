import {ButtonFormComponent} from "./button-form.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../../../store";
import {MatButtonModule} from "@angular/material/button";
import {selectButtonColorStyle, selectButtonStyle} from "../../../state/builder.selectors";
import {PushModule} from "@ngrx/component";
import {InputTypes} from "../../../state/shared/builder.enum";
import {Form} from "../../../state/shared/builder.interfaces";

describe('ButtonForm Component', () => {
  let component: ButtonFormComponent
  let fixture: ComponentFixture<ButtonFormComponent>
  let store: Store<State>
  let spySelect: jasmine.Spy
  const mockForm: Form = { id: 1, inputType: InputTypes.Button };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonFormComponent],
      imports: [
        MatButtonModule,
        StoreModule.forRoot({}),
        PushModule
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFormComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    spySelect = spyOn(store, 'select')
    component.item = mockForm
    fixture.detectChanges()
  })

  it('should set button styles without color', () => {
    component.ngOnInit();
    expect(spySelect).toHaveBeenCalledWith(selectButtonStyle, { id: mockForm.id });
  });

  it('should set buttonStyleColor observable', () => {
    component.ngOnInit();
    expect(spySelect).toHaveBeenCalledWith(selectButtonColorStyle, { id: mockForm.id });
  });

})

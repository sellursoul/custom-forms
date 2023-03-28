import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../../store";
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {setFormStyles} from "../../state/builder.actions";
import {Form} from "../../state/shared/builder.interfaces";
import {InputTypes} from "../../state/shared/builder.enum";
import {CheckboxChangerComponent} from "./checkbox-changer.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

describe('CheckBoxChanger Component', () => {
  let component: CheckboxChangerComponent
  let fixture: ComponentFixture<CheckboxChangerComponent>
  let store: Store<State>
  let dispatchSpy : jasmine.Spy
  let mockForm: Form = {id: 1, inputType: InputTypes.Checkbox}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatSlideToggleModule
      ],
      declarations:[
        CheckboxChangerComponent
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxChangerComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    dispatchSpy = spyOn(store, 'dispatch')
    component.id = mockForm.id
    fixture.detectChanges()
  })

  it('should dispatch CheckboxStyles action on submit',  () => {
    const input = {
      id: mockForm.id,
      checkboxStyles: {
        placeholder: '',
        fontWeight: 'normal',
        required: false
      }
    }
    component.submit()
    expect(dispatchSpy).toHaveBeenCalledWith(setFormStyles({input}))
  });

  it('should set default values', () => {
    expect(component.checkBoxChangerForm).toBeDefined();
    expect(component.checkBoxChangerForm.get('placeholder').value).toEqual('');
    expect(component.checkBoxChangerForm.get('fontWeight').value).toEqual('normal');
    expect(component.checkBoxChangerForm.get('required').value).toBeFalsy()
  });
})

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
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {InputChangerComponent} from "./input-changer.component";

describe('CheckBoxChanger Component', () => {
  let component: InputChangerComponent
  let fixture: ComponentFixture<InputChangerComponent>
  let store: Store<State>
  let dispatchSpy : jasmine.Spy
  let mockForm: Form = {id: 1, inputType: InputTypes.Input}

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
        InputChangerComponent
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InputChangerComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    dispatchSpy = spyOn(store, 'dispatch')
    component.id = mockForm.id
    fixture.detectChanges()
  })

  it('should dispatch CheckboxStyles action on submit',  () => {
    const input = {
      id: mockForm.id,
      inputStyles: {
        placeholder: '',
        fontSize: 14,
        fontWeight: 'normal',
        required: false
      }
    }
    component.submit()
    expect(dispatchSpy).toHaveBeenCalledWith(setFormStyles({input}))
  });

  it('should set default values', () => {
    expect(component.inputChangerForm).toBeDefined();
    expect(component.inputChangerForm.get('placeholder').value).toEqual('');
    expect(component.inputChangerForm.get('fontSize').value).toEqual(14);
    expect(component.inputChangerForm.get('fontWeight').value).toEqual('normal');
    expect(component.inputChangerForm.get('required').value).toBeFalsy()
  });
})

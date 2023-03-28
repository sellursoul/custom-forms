import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../../store";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {setFormStyles} from "../../state/builder.actions";
import {Form} from "../../state/shared/builder.interfaces";
import {InputTypes} from "../../state/shared/builder.enum";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {TextareaChangerComponent} from "./textarea-changer.component";

describe('TextAreaBoxChanger Component', () => {
  let component: TextareaChangerComponent
  let fixture: ComponentFixture<TextareaChangerComponent>
  let store: Store<State>
  let dispatchSpy : jasmine.Spy
  let mockForm: Form = {id: 1, inputType: InputTypes.TextArea}

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
        TextareaChangerComponent
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaChangerComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    dispatchSpy = spyOn(store, 'dispatch')
    component.id = mockForm.id
    fixture.detectChanges()
  })

  it('should dispatch TextAreaStyles action on submit',  () => {
    const input = {
      id: mockForm.id,
      textAreaStyles: {
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
    expect(component.textAreaChangerForm).toBeDefined();
    expect(component.textAreaChangerForm.get('placeholder').value).toEqual('');
    expect(component.textAreaChangerForm.get('fontSize').value).toEqual(14);
    expect(component.textAreaChangerForm.get('fontWeight').value).toEqual('normal');
    expect(component.textAreaChangerForm.get('required').value).toBeFalsy()
  });
})

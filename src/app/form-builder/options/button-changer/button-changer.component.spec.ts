import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../../store";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {setFormStyles} from "../../state/builder.actions";
import {ButtonChangerComponent} from "./button-changer.component";
import {Form} from "../../state/shared/builder.interfaces";
import {InputTypes} from "../../state/shared/builder.enum";

describe('ButtonChanger Component', () => {
  let component: ButtonChangerComponent
  let fixture: ComponentFixture<ButtonChangerComponent>
  let store: Store<State>
  let dispatchSpy : jasmine.Spy
  let mockForm: Form = {id: 1, inputType: InputTypes.Button}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule
      ],
      declarations:[
        ButtonChangerComponent
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonChangerComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    dispatchSpy = spyOn(store, 'dispatch')
    component.id = mockForm.id
    fixture.detectChanges()

  })

  it('should dispatch ButtonStyles action on submit',  () => {
    const input = {
      id: mockForm.id,
      buttonStyles: {
        placeholder: '',
        color: {
          red: 106,
          blue: 205,
          green: 90
        },
        fontWeight: 'normal',
        borderStyle: 'none',
        width: 50,
        height: 50
      }
    }
    component.submit()
    expect(dispatchSpy).toHaveBeenCalledWith(setFormStyles({input}))
  });

  it('should set default values', () => {
    expect(component.buttonChangerForm.get('borderStyle').value).toEqual('none');
    expect(component.buttonChangerForm.get('placeholder').value).toEqual('');
    expect(component.buttonChangerForm.get('fontWeight').value).toEqual('normal');
    expect(component.buttonChangerForm.get('width').value).toEqual(50);
    expect(component.buttonChangerForm.get('height').value).toEqual(50);
    expect(component.color.get('red').value).toEqual(106);
    expect(component.color.get('blue').value).toEqual(205);
    expect(component.color.get('green').value).toEqual(90);
  });
})

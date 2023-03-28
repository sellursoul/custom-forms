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
import {SelectChangerComponent} from "./select-changer.component";


describe('CheckBoxChanger Component', () => {
  let component: SelectChangerComponent
  let fixture: ComponentFixture<SelectChangerComponent>
  let store: Store<State>
  let dispatchSpy : jasmine.Spy
  let mockForm: Form = {id: 1, inputType: InputTypes.Select}

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
        SelectChangerComponent
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectChangerComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    dispatchSpy = spyOn(store, 'dispatch')
    component.id = mockForm.id
    fixture.detectChanges()
  })

  it('should dispatch SelectStyles action on submit',  () => {
    const input = {
      id: mockForm.id,
      selectStyles: {
        placeholder: null,
        firstOptionPlaceholder: '',
        secondOptionPlaceholder: '',
        thirdOptionPlaceholder: '',
        fontWeight: 'normal',
        required: false
      }
    }
    component.submit()
    expect(dispatchSpy).toHaveBeenCalledWith(setFormStyles({input}))
  });

  it('should set default values', () => {
    expect(component.selectChangerForm).toBeDefined();
    expect(component.selectChangerForm.get('placeholder').value).toEqual(null);
    expect(component.selectChangerForm.get('firstOptionPlaceholder').value).toEqual('');
    expect(component.selectChangerForm.get('secondOptionPlaceholder').value).toEqual('');
    expect(component.selectChangerForm.get('thirdOptionPlaceholder').value).toEqual('');
    expect(component.selectChangerForm.get('fontWeight').value).toEqual('normal');
    expect(component.selectChangerForm.get('required').value).toBeFalsy()
  });
})

import {TextareaFormComponent} from "./textarea-form.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../../../store";
import {Form} from "../../../state/shared/builder.interfaces";
import {InputTypes} from "../../../state/shared/builder.enum";
import {PushModule} from "@ngrx/component";
import {selectTextAreaStyle} from "../../../state/builder.selectors";

describe('TextareaForm Component', () => {

  let component: TextareaFormComponent
  let fixture: ComponentFixture<TextareaFormComponent>
  let store: Store<State>
  let spySelect: jasmine.Spy
  const mockForm: Form = { id: 1, inputType: InputTypes.TextArea };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaFormComponent],
      imports: [
        StoreModule.forRoot({}),
        PushModule]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaFormComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    spySelect = spyOn(store, 'select')
    component.item = mockForm
    fixture.detectChanges()
  })

  it('should set textarea styles',  () => {
    component.ngOnInit();
    expect(spySelect).toHaveBeenCalledWith(selectTextAreaStyle,{id: mockForm.id})
  });
})

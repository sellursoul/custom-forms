import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../../../store";
import {selectCheckBoxStyle} from "../../../state/builder.selectors";
import {PushModule} from "@ngrx/component";
import {InputTypes} from "../../../state/shared/builder.enum";
import {Form} from "../../../state/shared/builder.interfaces";
import {CheckboxFormComponent} from "./checkbox-form.component";
import {MatCheckboxModule} from "@angular/material/checkbox";

describe('CheckboxForm Component', () => {
  let component: CheckboxFormComponent
  let fixture: ComponentFixture<CheckboxFormComponent>
  let store: Store<State>
  let spySelect: jasmine.Spy
  const mockForm: Form = { id: 1, inputType: InputTypes.Checkbox };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxFormComponent],
      imports: [
        MatCheckboxModule,
        StoreModule.forRoot({}),
        PushModule
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxFormComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    spySelect = spyOn(store, 'select')
    component.item = mockForm
    fixture.detectChanges()
  })

  it('should set checkbox styles', () => {
    component.ngOnInit();
    expect(spySelect).toHaveBeenCalledWith(selectCheckBoxStyle, { id: mockForm.id });
  });
})

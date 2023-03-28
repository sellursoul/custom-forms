import {SelectFormComponent} from "./select-form.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {State} from "../../../../store";
import {Store, StoreModule} from "@ngrx/store";
import {PushModule} from "@ngrx/component";
import {MatSelectModule} from "@angular/material/select";
import {InputTypes} from "../../../state/shared/builder.enum";
import {Form} from "../../../state/shared/builder.interfaces";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CdkDrag, CdkDropList, CdkDropListGroup, DragDropModule} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {selectSelectStyle} from "../../../state/builder.selectors";

describe('should set select styles', () => {
  let component: SelectFormComponent
  let fixture: ComponentFixture<SelectFormComponent>
  let store: Store<State>
  let spySelect: jasmine.Spy
  const mockForm: Form = {id: 1, inputType: InputTypes.Select}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFormComponent],
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        PushModule,
        MatInputModule,
        MatSelectModule
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFormComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    spySelect = spyOn(store, 'select')
    component.item = mockForm
    fixture.detectChanges()
  })

  it('should get SelectStyles from store', () => {
    expect(spySelect).toHaveBeenCalledWith(selectSelectStyle,{id: mockForm.id})
  });

})

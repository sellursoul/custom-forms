import {FormBuilderComponent} from "./form-builder.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {Store, StoreModule} from "@ngrx/store";
import {State} from "../../store";
import {ReactiveFormsModule} from "@angular/forms";
import {PushModule} from "@ngrx/component";
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, DragDropModule} from "@angular/cdk/drag-drop";
import {InputTypes} from "../state/shared/builder.enum";
import {GeneralStylesComponent} from "./general-area-styles/general-styles.component";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {addForm, deleteForm} from "../state/builder.actions";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Form} from "../state/shared/builder.interfaces";
import {getForms, getInputs, selectGeneralBorderStyle, selectGeneralColorStyle} from "../state/builder.selectors";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {InputFormComponent} from "./working-forms/input-form/input-form.component";
import {InputChangerComponent} from "../options/input-changer/input-changer.component";

describe('FormBuilder component', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;
  let store: Store<State>;
  let dispatchSpy: jasmine.Spy;
  let selectSpy: jasmine.Spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormBuilderComponent,
        GeneralStylesComponent,
        InputFormComponent,
        InputChangerComponent
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        PushModule,
        DragDropModule,
        MatInputModule,
        MatIconModule,
        CdkDrag,
        CdkDropList,
        CdkDropListGroup,
        MatButtonModule,
        MatSelectModule,
        MatSlideToggleModule,
        RouterLink,
        RouterOutlet,
        MatCheckboxModule,
        MatDialogModule
      ]
    }).compileComponents()
  })
  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    dispatchSpy = spyOn(store, 'dispatch')
    selectSpy = spyOn(store, 'select')
    fixture.detectChanges()
  })

  it('should display general area styles when no form is selected', () => {
    const ulElement = fixture.nativeElement.querySelector('ul');
    expect(ulElement.textContent).toContain('Border style');
  })

  it('should delete an item', () => {
    const id = 1;
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteItem(id);
    expect(store.dispatch).toHaveBeenCalledWith(deleteForm({id}));
  });

  it('should delete item when Enter key is pressed in confirmation dialog', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(component, 'deleteItem')
    const form: Form[] = [
      {id: 1, inputType: InputTypes.Input},
      {id: 2, inputType: InputTypes.Input}
    ]
    component.formControls$ = of(form)
    fixture.detectChanges()
    const deleteButton = fixture.debugElement.query(By.css('.delete_btn')).nativeElement
    deleteButton.click()
    fixture.detectChanges()
    window.confirm('Are you sure?')
    expect(window.confirm).toHaveBeenCalledWith('Are you sure?')
    expect(component.deleteItem).toHaveBeenCalled();
  }));

  it('should select input type and id', () => {
    const id = 1;
    const type = InputTypes.Input
    component.selectInputType(type, id);
    expect(component.value).toEqual(type);
    expect(component.selectedFormId).toEqual(id);
  });

  it('should add item to working area', () => {
    const form: Form = {
      id: 1,
      inputType: InputTypes.Input,
      placeholder: 'hello',
      icon: 'icon'
    }
    const DropEvent = {
      previousContainer: {data: [form]},
      container: {data: []},
      previousIndex: 0,
      currentIndex: 0,
    } as CdkDragDrop<Form[]>;

    component.drop(DropEvent)
    expect(dispatchSpy).toHaveBeenCalledWith(addForm({input: form}))
  });

  it('should get inputs from the store', () => {
    expect(selectSpy).toHaveBeenCalledWith(getInputs);
  });

  it('should get form controls from the store', () => {
    expect(selectSpy).toHaveBeenCalledWith(getForms);
  });

  it('should get form controls from the store', () => {
    expect(selectSpy).toHaveBeenCalledWith(selectGeneralBorderStyle);
  });

  it('should get form controls from the store', () => {
    expect(selectSpy).toHaveBeenCalledWith(selectGeneralColorStyle);
  });
})

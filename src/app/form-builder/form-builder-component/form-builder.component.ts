import {Component,OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {map, Observable} from "rxjs";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Form} from '../state/shared/builder.interfaces';
import {
  getForms,
  getInputs,
  selectGeneralBorderStyle,
  selectGeneralColorStyle,
} from "../state/builder.selectors";
import {InputTypes} from "../state/shared/builder.enum";
import {addForm, deleteForm} from "../state/builder.actions";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  inputs$: Observable<Form[]>
  formControls$: Observable<Form[]>
  selectedForm: typeof InputTypes = InputTypes
  selectedFormId: number
  value: string
  errorMessage$: Observable<string>

  generalBorderStyle$: Observable<string>
  generalColorStyle$: Observable<string>

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.inputs$ = this.store.select(getInputs)
    this.formControls$ = this.store.select(getForms)
    this.generalBorderStyle$ = this.store.select(selectGeneralBorderStyle)
    this.generalColorStyle$ = this.store.select(selectGeneralColorStyle)
  }

  selectInputType(type: InputTypes, id: number) {
    this.value = type
    this.selectedFormId = id
  }

  deleteItem(id: number) {
    if (confirm('Are you sure, you want to delete?')) {
      this.store.dispatch(deleteForm({id}))
    }
  }

  drop(event: CdkDragDrop<Form[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const input = Object.assign({}, event.previousContainer.data[event.previousIndex]);
      this.store.dispatch(addForm({input}))
    }
  }
}

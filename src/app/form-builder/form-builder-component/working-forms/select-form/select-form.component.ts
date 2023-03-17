import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Form, selectStyles} from "../../../state/shared/builder.interfaces";
import {State} from "../../../../store";
import { Store } from '@ngrx/store';
import { selectSelectStyle } from 'src/app/form-builder/state/builder.selectors';

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss', '../styles/styles.scss']
})
export class SelectFormComponent implements OnInit{
  @Input() item: Form
  selectStyle$: Observable<selectStyles>

  constructor(private store: Store<State>) {
  }

  ngOnInit(){
    this.selectStyle$ = this.store.select(selectSelectStyle, {id: this.item.id})
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {
  checkboxStyles,
  Form,
} from "../../../state/shared/builder.interfaces";
import {Observable} from "rxjs";
import {State} from "../../../../store";
import { Store } from '@ngrx/store';
import {selectCheckBoxStyle} from "../../../state/builder.selectors";

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.scss', '../styles/styles.scss']
})
export class CheckboxFormComponent implements OnInit{
  @Input () item: Form

  checkboxStyle$: Observable<checkboxStyles>


  constructor(private store:Store<State>) {
  }

  ngOnInit() {
    this.checkboxStyle$ = this.store.select(selectCheckBoxStyle, {id: this.item.id})
  }
}

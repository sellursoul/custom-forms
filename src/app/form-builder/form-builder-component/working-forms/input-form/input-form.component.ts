import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Form, inputStyles} from "../../../state/shared/builder.interfaces";
import {selectInputStyle} from "../../../state/builder.selectors";
import {Store} from "@ngrx/store";
import {State} from "../../../../store";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss', '../styles/styles.scss']
})
export class InputFormComponent implements OnInit {
  @Input() item: Form

  inputStyle$: Observable<inputStyles>

  constructor(private store: Store<State>, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.inputStyle$ = this.store.select(selectInputStyle, {id: this.item.id})
  }
}

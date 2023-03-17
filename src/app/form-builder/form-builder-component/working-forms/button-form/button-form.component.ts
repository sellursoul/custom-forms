import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {buttonStyles, Form} from "../../../state/shared/builder.interfaces";
import {State} from "../../../../store";
import { Store } from '@ngrx/store';
import {selectButtonColorStyle, selectButtonStyle} from "../../../state/builder.selectors";

@Component({
  selector: 'app-button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss', '../styles/styles.scss']
})
export class ButtonFormComponent implements OnInit{
  @Input() item: Form
  buttonStyle$: Observable<buttonStyles>
  buttonStyleColor$: Observable<string>

  constructor(private store:Store<State>) {
  }

  ngOnInit() {
    this.buttonStyle$ = this.store.select(selectButtonStyle, {id: this.item.id})
    this.buttonStyleColor$ = this.store.select(selectButtonColorStyle, {id: this.item.id})
  }

}

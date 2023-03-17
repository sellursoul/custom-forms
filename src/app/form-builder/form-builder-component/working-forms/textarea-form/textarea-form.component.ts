import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Form, textAreaStyles} from "../../../state/shared/builder.interfaces";
import {Store} from "@ngrx/store";
import {State} from "../../../../store";
import {selectTextAreaStyle} from "../../../state/builder.selectors";

@Component({
  selector: 'app-textarea-form',
  templateUrl: './textarea-form.component.html',
  styleUrls: ['./textarea-form.component.scss', '../styles/styles.scss']
})
export class TextareaFormComponent implements OnInit{
  @Input() item: Form

  textAreaStyle$: Observable<textAreaStyles>

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.textAreaStyle$ = this.store.select(selectTextAreaStyle, {id: this.item.id})
  }
}

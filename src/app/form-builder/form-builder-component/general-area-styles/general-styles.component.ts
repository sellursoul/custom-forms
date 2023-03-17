import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../store";
import {FormBuilder, FormGroup} from "@angular/forms";
import {setGeneralStyles} from "../../state/builder.actions";

@Component({
  selector: 'app-general-area-styles',
  templateUrl: './general-styles.component.html',
  styleUrls: ['./general-styles.component.scss']
})
export class GeneralStylesComponent implements OnInit{

  generalStylesForm: FormGroup

  constructor(private store: Store<State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.generalStylesForm = this.fb.group({
      borderStyle: ('dotted'),
      color: this.fb.group({
        red: (245),
        blue: (245),
        green: (245),
      }),
    })
  }

  get color() {
    return this.generalStylesForm.get('color') as FormGroup
  }

  submit() {
    const generalStyle = this.generalStylesForm.value
    this.store.dispatch(setGeneralStyles({generalStyle}))
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {State} from "../../../store";
import {Store} from '@ngrx/store';
import {setFormStyles} from "../../state/builder.actions";

@Component({
  selector: 'app-input-changer',
  templateUrl: './input-changer.component.html',
  styleUrls: ['./input-changer.component.scss', '../style/common-option-styles.scss']
})
export class InputChangerComponent implements OnInit {
  @Input() id: number

  inputChangerForm: FormGroup

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.inputChangerForm = new FormGroup({
      placeholder: new FormControl(''),
      fontSize: new FormControl(14, [Validators.min(1),Validators.max(40)]),
      fontWeight: new FormControl('normal'),
      required: new FormControl(false)
    })
  }

  submit() {
    if (this.inputChangerForm.valid) {
      const input = {
        id: this.id,
        inputStyles: {
          placeholder: this.inputChangerForm.value.placeholder,
          fontSize: this.inputChangerForm.value.fontSize,
          fontWeight: this.inputChangerForm.value.fontWeight,
          required: this.inputChangerForm.value.required
        }
      }
      this.store.dispatch(setFormStyles({input}))
      this.inputChangerForm.reset()
    }
  }
}

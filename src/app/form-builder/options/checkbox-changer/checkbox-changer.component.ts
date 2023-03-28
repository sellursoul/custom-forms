import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from '@ngrx/store';
import {State} from "../../../store";
import {setFormStyles} from "../../state/builder.actions";

@Component({
  selector: 'app-checkbox-changer',
  templateUrl: './checkbox-changer.component.html',
  styleUrls: ['./checkbox-changer.component.scss', '../style/common-option-styles.scss']
})
export class CheckboxChangerComponent implements OnInit {

  @Input() id: number
  checkBoxChangerForm: FormGroup

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.checkBoxChangerForm = new FormGroup({
      placeholder: new FormControl(''),
      fontWeight: new FormControl('normal'),
      required: new FormControl(false)
    })
  }

  submit() {
    if(this.checkBoxChangerForm.valid) {
      const input = {
        id: this.id,
        checkboxStyles: {
          placeholder: this.checkBoxChangerForm.value.placeholder,
          fontWeight: this.checkBoxChangerForm.value.fontWeight,
          required: this.checkBoxChangerForm.value.required
        }
      }
      this.store.dispatch(setFormStyles({input}))
      this.checkBoxChangerForm.reset()
    }
  }
}

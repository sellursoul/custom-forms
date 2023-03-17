import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {State} from "../../../store";
import {setFormStyles} from "../../state/builder.actions";

@Component({
  selector: 'app-button-changer',
  templateUrl: './button-changer.component.html',
  styleUrls: ['./button-changer.component.scss']
})
export class ButtonChangerComponent implements OnInit {

  @Input () id:number

  buttonChangerForm: FormGroup

  constructor(private store: Store<State>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buttonChangerForm = this.fb.group({
      placeholder: (''),
      fontWeight: ('normal'),
      width: [50, [Validators.min(50), Validators.max(500)]],
      height: [50, [Validators.min(50), Validators.max(200)]],
      borderStyle: ('none'),
      color: this.fb.group({
        red: (106),
        blue: (205),
        green: (90),
      }),
    })
  }

  get color() {
    return this.buttonChangerForm.get('color') as FormGroup
  }

  submit() {
    if(this.buttonChangerForm.valid) {
      const input = {
        id: this.id,
        buttonStyles: {
          placeholder: this.buttonChangerForm.value.placeholder,
          width: this.buttonChangerForm.value.width,
          height: this.buttonChangerForm.value.height,
          color: this.buttonChangerForm.value.color,
          borderStyle: this.buttonChangerForm.value.borderStyle,
          fontWeight: this.buttonChangerForm.value.fontWeight,
          required: this.buttonChangerForm.value.fontWeight
        }
      }
      this.store.dispatch(setFormStyles({input}))
      this.buttonChangerForm.reset()
    }
  }
}

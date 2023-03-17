import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../store";
import {FormControl, FormGroup} from "@angular/forms";
import {setFormStyles} from "../../state/builder.actions";

@Component({
  selector: 'app-select-changer',
  templateUrl: './select-changer.component.html',
  styleUrls: ['./select-changer.component.scss']
})
export class SelectChangerComponent implements OnInit{
  @Input() id: number
  selectChangerForm: FormGroup

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.selectChangerForm = new FormGroup({
      placeholder: new FormControl(null),
      firstOptionPlaceholder: new FormControl(''),
      secondOptionPlaceholder: new FormControl(''),
      thirdOptionPlaceholder: new FormControl(''),
      fontWeight: new FormControl ('normal'),
      required: new FormControl (false)
    })
  }

  submit() {
    if(this.selectChangerForm.valid) {
      const input = {
        id: this.id,
        selectStyles: {
          placeholder: this.selectChangerForm.value.placeholder,
          firstOptionPlaceholder: this.selectChangerForm.value.firstOptionPlaceholder,
          secondOptionPlaceholder: this.selectChangerForm.value.secondOptionPlaceholder,
          thirdOptionPlaceholder: this.selectChangerForm.value.thirdOptionPlaceholder,
          fontWeight: this.selectChangerForm.value.fontWeight,
          required: this.selectChangerForm.value.required
        }
      }
      this.store.dispatch(setFormStyles({input}))
      this.selectChangerForm.reset()
    }
  }
}

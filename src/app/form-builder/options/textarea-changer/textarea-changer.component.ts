import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {setFormStyles} from "../../state/builder.actions";

@Component({
  selector: 'app-textarea-changer',
  templateUrl: './textarea-changer.component.html',
  styleUrls: ['./textarea-changer.component.scss', '../style/common-option-styles.scss']
})
export class TextareaChangerComponent implements OnInit {

  @Input() id: number
  textAreaChangerForm: FormGroup

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.textAreaChangerForm = new FormGroup({
      placeholder: new FormControl(''),
      fontSize: new FormControl (14, [Validators.min(1),Validators.max(40)]),
      fontWeight: new FormControl ('normal'),
      required: new FormControl(false)
    })
  }

  submit() {
    if (this.textAreaChangerForm.valid) {
      const input = {
        id: this.id,
        textAreaStyles: {
          placeholder: this.textAreaChangerForm.value.placeholder,
          fontSize: this.textAreaChangerForm.value.fontSize,
          fontWeight: this.textAreaChangerForm.value.fontWeight,
          required: this.textAreaChangerForm.value.fontWeight
        }
      }
      this.store.dispatch(setFormStyles({input}))
      this.textAreaChangerForm.reset()
    }
  }

}

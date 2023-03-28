import {generalStyles, Form,} from "./shared/builder.interfaces"
import {InputTypes} from "./shared/builder.enum";

export interface BuilderState {
  inputs: Form[]
  formControls: Form[]
  generalStyle: generalStyles
}

export const initialState: BuilderState = {
  inputs: [
    {id: 1, name: "Input", inputType: InputTypes.Input, icon: "crop_din",
      inputStyles: {
        placeholder: 'Title',
        fontSize: 14,
        fontWeight: 'normal',
        required: false
      }},
    {id: 2, name: "Text-area", inputType: InputTypes.TextArea, icon: "assignment",
      textAreaStyles: {
        placeholder: 'Description',
        fontSize: 14,
        fontWeight: 'normal',
        required: false
      }},
    {id: 3, name: "Checkbox", inputType: InputTypes.Checkbox, icon: "check_box",
      checkboxStyles: {
        placeholder: 'Checkbox item',
        fontWeight: 'normal',
        required: false
      }},
    {id: 4, name: "Button", inputType: InputTypes.Button, icon: "broken_image",
      buttonStyles: {
        placeholder: 'Submit',
        color: {
          red: 106,
          blue: 205,
          green: 90
        },
        fontWeight: 'normal',
        borderStyle: 'none',
        width: 100,
        height: 50
      }},
    {id: 5, name: "Select", inputType: InputTypes.Select, icon: "view_headline",
      selectStyles: {
        placeholder: 'Title',
        firstOptionPlaceholder: '1-st option',
        secondOptionPlaceholder: '2-nd option',
        thirdOptionPlaceholder: '3-rd option',
        fontWeight: 'normal',
        required: false
      }}
  ],
  formControls: [],
  generalStyle: {
    color: {
      red: 245,
      blue: 245,
      green: 245
    },
    borderStyle: 'dotted'
  }
}

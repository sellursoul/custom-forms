import {InputTypes} from "./builder.enum";

export interface Colors {
  red: number
  blue: number
  green: number
}

export interface Form {
  id?: number
  name?: string
  inputType?: InputTypes
  placeholder?: string
  icon?: string
  inputStyles?: inputStyles
  textAreaStyles?: textAreaStyles
  buttonStyles?: buttonStyles
  checkboxStyles?: checkboxStyles
  selectStyles?: selectStyles
}

export interface inputStyles {
  placeholder?: string
  fontSize?: number
  fontWeight?: string
  required?: boolean
}

export interface textAreaStyles {
  placeholder?: string
  fontSize?: number
  fontWeight?: string
  required?: boolean
}
export interface buttonStyles {
  placeholder?: string
  color?: Colors
  borderStyle?: string
  fontWeight?: string
  width?: number
  height?: number
  required?: boolean
}
export interface checkboxStyles {
  placeholder?: string
  fontWeight?: string
  required?: boolean
}

export interface selectStyles {
  placeholder?: string
  firstOptionPlaceholder?: string
  secondOptionPlaceholder?: string
  thirdOptionPlaceholder?: string
  fontWeight?: string
  required?: boolean
}
export interface generalStyles {
  borderStyle: string
  color: Colors
}

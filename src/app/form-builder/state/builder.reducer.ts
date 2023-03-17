import {createReducer, on} from "@ngrx/store";
import {initialState} from "./builder.state";
import {
  addForm,
  setGeneralStyles, setFormStyles, deleteForm,
} from "./builder.actions";

const _builderReducer = createReducer(initialState,
  on(addForm, (state, action) => {
    let input = {...action.input}
    input.id = (state.formControls.length +1)
    return {
      ...state,
      formControls: [...state.formControls, input]
    }
  }),
  on(setFormStyles, (state, action) => {
    const input = action.input
    return {
      ...state,
      formControls: state.formControls.map(form => (form.id === action.input.id ? {...form, ...input} : form))
    }
  }),
  on(deleteForm, (state, {id}) => {
    const updatedForms = state.formControls.filter(item => {
      return item.id !== id
    })
    return {
      ...state,
      formControls: updatedForms
    }
  }),
  on(setGeneralStyles, (state, action) => {
    return {
      ...state,
      generalStyle: action.generalStyle
    }
  })
)

export function BuilderReducer(state, action) {
  return _builderReducer(state, action);
}

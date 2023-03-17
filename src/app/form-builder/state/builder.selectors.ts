import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BuilderState} from "./builder.state";

export const BUILDER_STATE_NAME = 'builder';

export const getBuilderState = createFeatureSelector<BuilderState>(BUILDER_STATE_NAME)

export const getInputs = createSelector(getBuilderState, state => {
  return state.inputs
})
export const getForms = createSelector(getBuilderState, state => {
  return state.formControls
})
export const selectInputStyle = createSelector(getBuilderState, (state,props: { id: number }) => {
  return state.formControls.find(form => form.id === props.id)?.inputStyles
})
export const selectTextAreaStyle = createSelector(getBuilderState, (state,props: { id: number }) => {
  return state.formControls.find(form => form.id === props.id)?.textAreaStyles
})
export const selectButtonStyle = createSelector(getBuilderState, (state,props: { id: number }) => {
  return state.formControls.find(form => form.id === props.id)?.buttonStyles
})
export const selectButtonColorStyle = createSelector(getBuilderState, (state,props: { id: number }) => {
  const buttonRedColor = state.formControls.find(form => form.id === props.id)?.buttonStyles.color.red
  const buttonGreenColor = state.formControls.find(form => form.id === props.id)?.buttonStyles.color.green
  const buttonBlueColor = state.formControls.find(form => form.id === props.id)?.buttonStyles.color.blue
  return `rgb(${buttonRedColor}, ${buttonGreenColor}, ${buttonBlueColor})`
})
export const selectCheckBoxStyle = createSelector(getBuilderState, (state,props: { id: number }) => {
  return state.formControls.find(form => form.id === props.id)?.checkboxStyles
})
export const selectSelectStyle = createSelector(getBuilderState, (state,props: { id: number }) => {
  return state.formControls.find(form => form.id === props.id)?.selectStyles
})
export const selectGeneralBorderStyle = createSelector(getBuilderState, state => {
  return state.generalStyle.borderStyle
})
export const selectGeneralColorStyle = createSelector(getBuilderState, state => {
  return `rgb(${state.generalStyle.color.red}, ${state.generalStyle.color.green}, ${state.generalStyle.color.blue})`
})


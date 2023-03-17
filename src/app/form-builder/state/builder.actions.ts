import {createAction, props} from "@ngrx/store";
import {generalStyles, Form,} from "./shared/builder.interfaces";

export const ADD_FORM = '[builder] add form'
export const DELETE_FORM = '[builder] delete form'
export const UPDATE_FORM_STYLE = '[builder] update input'
export const GENERAL_STYLES_CHANGER = '[builder] general changer'

export const addForm = createAction(ADD_FORM,
  props<{ input: Form }>());
export const deleteForm = createAction(DELETE_FORM,
  props<{ id: number }>());
export const setFormStyles = createAction(UPDATE_FORM_STYLE,
  props<{ input: Form }>());
export const setGeneralStyles = createAction(GENERAL_STYLES_CHANGER,
  props<{ generalStyle: generalStyles }>());




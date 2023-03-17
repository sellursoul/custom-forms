import {createAction, props} from "@ngrx/store";
import {UserModel} from "../../shared/models/user.model";

export const LOGIN_START = '[auth] login start'
export const LOGIN_SUCCESS = '[auth] login success'
export const LOGIN_FAIL = '[auth] login fail'

export const SIGNUP_START = '[auth] signup start'
export const SIGNUP_SUCCESS = '[auth] signup success'

export const AUTO_LOGIN = '[auth] auto login'

export const LOGOUT_ACTION = '[auth] logout'

export const loginStart = createAction(LOGIN_START, props<{email: string; password: string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user: UserModel; redirect: boolean}>());

export const signUpStart = createAction(SIGNUP_START, props<{email: string; password: string}>());
export const signUpSuccess = createAction(SIGNUP_SUCCESS, props<{user: UserModel, redirect: boolean}>());

export const autoLogin = createAction(AUTO_LOGIN);

export const logout = createAction(LOGOUT_ACTION);


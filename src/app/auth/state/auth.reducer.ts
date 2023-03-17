import {createReducer, on} from "@ngrx/store";
import {initialState} from "./auth.state";
import {loginSuccess, logout, signUpSuccess} from "./auth.actions";

const _authReducer = createReducer(initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(signUpSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null
    }
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}


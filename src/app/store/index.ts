import {isDevMode} from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {SHARED_STATE_NAME} from "./shared/shared.selector";
import {SharedState} from "./shared/shared.state";
import {sharedReducer} from "./shared/shared.reducer";
import {AUTH_STATE_NAME} from "../auth/state/auth.selector";
import {AuthState} from "../auth/state/auth.state";
import {AuthReducer} from "../auth/state/auth.reducer";
import {BUILDER_STATE_NAME} from "../form-builder/state/builder.selectors";
import {BuilderState} from "../form-builder/state/builder.state";
import {BuilderReducer} from "../form-builder/state/builder.reducer";

export interface State {
  [AUTH_STATE_NAME]: AuthState;
  [SHARED_STATE_NAME]: SharedState;
  [BUILDER_STATE_NAME]: BuilderState
}

export const reducers: ActionReducerMap<State> = {
  [SHARED_STATE_NAME]: sharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [BUILDER_STATE_NAME]: BuilderReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

import {UserModel} from "../../shared/models/user.model";

export interface AuthState {
  user: UserModel | null
}

export const initialState: AuthState = {
  user: null
};

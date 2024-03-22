import { userAuthReducer } from '../users/user.reducer';
import { UserAuthState } from '../users/user.state';

export interface AppState {
  userAuth: UserAuthState;
}

export const appReducer = {
  userAuth: userAuthReducer,
};

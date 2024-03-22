import { User } from "../../models/user.model";

export interface UserAuthState {
    user?: User; 
  }
  
  export const initialState: UserAuthState = {
    user: undefined,
  };
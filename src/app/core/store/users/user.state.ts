import { User } from "../../models/user.model";

export interface UserAuthState {
    user?: User; // Use optional chaining for a cleaner syntax 
  }
  
  export const initialState: UserAuthState = {
    user: undefined,
  };
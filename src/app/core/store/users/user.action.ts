import { createAction, props } from '@ngrx/store';
import { User, UserReq } from '../../models/user.model';
import { Role } from '../../enums/roles.enum';

export const ADMIN_LOGIN_START = '[auth/user] ADMIN login start';
export const ADMIN_LOGIN_SUCCESS = '[auth/user] ADMIN login success';

export const USER_LOGIN_START = '[auth/user] USER login start';
export const USER_LOGIN_SUCCESS = '[auth/user] USER login success';
export const USER_LOGIN_FAIL = '[auth/user] USER login fail';

export const USER_LOGOUT = '[auth/user] USER logout start';

export const USER_SIGNUP_START = '[auth/user] USER sign up start';
export const USER_SIGNUP_SUCCESS = '[auth/user] USER sign up success';
export const USER_SIGNUP_FAIL = '[auth/user] USER sign up fail';

// LOGIN
export const startLoginAction = createAction(
  USER_LOGIN_START,
  props<{ email: string; password: string }>()
);

// LOGIN

export const adminLoginAction = createAction(
  ADMIN_LOGIN_START,
  props<{ email: string; password: string }>()
);

export const adminLoginSuccessAction = createAction(
  USER_LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const userRoleAction = createAction(
  '[auth/user] User Role',
  props<{ role: Role }>()
);

export const extractEmail = createAction(
  '[auth/user] Extract Email',
  props<{ token: string }>()
);

export const extractEmailSuccess = createAction(
  '[auth/user] Extract Email Success',
  props<{ email: string }>()
);

export const extractEmailFailure = createAction(
  '[auth/user] Extract Email Failure',
  props<{ error: any }>()
);

export const loginSuccessAction = createAction(
  USER_LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const logoutAction = createAction(USER_LOGOUT);

//  SIGN UP
export const startRegisterAction = createAction(
  USER_SIGNUP_START,
  props<{ user: UserReq }>()
);

export const registerSuccessAction = createAction(
  USER_SIGNUP_SUCCESS,
  props<{ user: User }>()
);

import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  catchError,
  defer,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  extractEmail,
  extractEmailFailure,
  loginSuccessAction,
  logoutAction,
  registerSuccessAction,
  startLoginAction,
  startRegisterAction,
} from './user.action';
import { UserService } from '../../services/users/user.service';
import { UserAuthService } from '../../services/users/auth/user-auth.service';
import { formatUser } from '../../utils/utility';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private route: Router
  ) {}

  extractEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(extractEmail),
      switchMap(({ token }) => {
        console.log('Switch Token : ', token);
        const decodedToken = jwtDecode(token);
        const email = decodedToken.sub as string;
        return this.userService.getByEmail(email).pipe(
          map((res) => {
            const user = formatUser(res);
            return loginSuccessAction({ user });
          }),
          catchError((error) => {
            console.error('1- Err : ', error);
            return of(extractEmailFailure({ error }));
          })
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startLoginAction),
      switchMap((action) => {
        let authReq = {
          email: action.email,
          password: action.password,
        };

        return this.userAuthService.login(authReq).pipe(
          map((res) => {
            const token = res.data.token;
            localStorage.setItem('token', token);
            console.log('Token : ', token);
            this.route.navigate(['account-settings/profile']);
            return extractEmail({ token });
          })
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startRegisterAction),
      exhaustMap((action) => {
        return this.userAuthService.register(action.user).pipe(
          map((res) => {
            const user = formatUser(res);
            this.route.navigateByUrl('/auth/login');
            return registerSuccessAction({ user });
          })
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          localStorage.removeItem('token');
          this.route.navigateByUrl('/auth/login');
        })
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    defer(() => {
      const token = localStorage.getItem('token');
      if (token) {
        return of(extractEmail({ token: token }));
      } else {
        return of(logoutAction());
      }
    })
  );
}

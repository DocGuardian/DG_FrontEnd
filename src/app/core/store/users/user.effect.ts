import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  catchError,
  defer,
  exhaustMap,
  map,
  mergeMap,
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
import { HttpResponse } from '../../models/httpRes.model';
import { User } from '../../models/user.model';

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
            // Dispatch success action with extracted email
            const user = formatUser(res);
            return loginSuccessAction({ user });
          }),
          catchError((error) => {
            // Dispatch failure action if extraction fails
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

            //const user = formatUser(res);

            // const decodedToken = jwtDecode(token);
            // const email = decodedToken.sub as string;
            // console.log(decodedToken.sub);

            // this.userService.getByEmail(email).pipe(
            //   map((res) => {
            //     console.log(
            //       'User By Email : ' + JSON.stringify(res.data.response)
            //     );
            //     const user = formatUser(res);
            //     localStorage.setItem('user', JSON.stringify(user));
            //   })
            // ),
            this.route.navigate(['home']);
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
          localStorage.removeItem('user');
          this.route.navigateByUrl('/auth/login');
        })
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    defer(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        return of(loginSuccessAction({ user: JSON.parse(userData) }));
      } else {
        return of(logoutAction());
      }
    })
  );
}

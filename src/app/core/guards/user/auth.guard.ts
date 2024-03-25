import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getToken } from '../../utils/utility';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { extractEmail } from '../../store/users/user.action';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user?: User;
  constructor(private _router: Router, private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = getToken();
    let role = getToken();

    if (token != null) {
      return true;
    } else {
      this._router.navigate(['auth/register']);
      return false;
    }
  }
}

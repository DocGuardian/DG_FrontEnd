import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { getToken } from '../../utils/utility';

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthGuard implements CanActivate {
  
  constructor(private _router: Router, private _store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = getToken();
    if (token) {
      if (window.history.length > 2) {
        window.history.back();
      }
      this._router.navigateByUrl('/dg/profile');
      return false;
    } else {
      return true;
    }
  }
}

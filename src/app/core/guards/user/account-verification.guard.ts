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
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationGuard implements CanActivate {
  user?: User;
  constructor(private _router: Router, private _store: Store<AppState>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      this._store.select('userAuth').subscribe((state) => {
        this.user = state.user;
      });
      if (this.user?.isEnabled) {
        return true;
      } else {
        this._router.navigate(['account-not-activated']);
        return false;
      }
  }
}

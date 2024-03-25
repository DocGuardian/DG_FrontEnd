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
import { Role } from '../../enums/roles.enum';
import { getRole, getToken } from '../../utils/utility';
import { extractEmail } from '../../store/users/user.action';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  user?: User;
  constructor(private store: Store<AppState>, private _router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    let token = getToken();
    let role = getRole();
    if (role != null) {
    
      if (this.user?.role === Role.ADMIN) {
        return true;
      }
    }
    window.history.back();

    return false;
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Role } from 'src/app/core/enums/roles.enum';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/state/app.state';
import { extractEmail, logoutAction } from 'src/app/core/store/users/user.action';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  constructor(private _store: Store<AppState>) {}
  logout(): void {
    this._store.dispatch(logoutAction());
  }
}

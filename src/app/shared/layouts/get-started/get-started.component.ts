import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/state/app.state';
import { logoutAction } from 'src/app/core/store/users/user.action';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css'],
})
export class GetStartedComponent {
  user?: User;
  constructor(private _store: Store<AppState>) {}
  logout(): void {
    this._store.dispatch(logoutAction());
  }
}

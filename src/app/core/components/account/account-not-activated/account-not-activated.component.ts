import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { logoutAction } from 'src/app/core/store/users/user.action';

@Component({
  selector: 'app-account-not-activated',
  templateUrl: './account-not-activated.component.html',
  styleUrls: ['./account-not-activated.component.css'],
})
export class AccountNotActivatedComponent {
  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(logoutAction());
  }
}

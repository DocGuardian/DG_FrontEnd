import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/state/app.state';
import { logoutAction } from 'src/app/core/store/users/user.action';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css'],
})
export class GetStartedComponent implements OnInit {
  user?: User;
  isEnabled!: boolean;
  constructor(private _store: Store<AppState>, private route: Router) {}
  ngOnInit(): void {
    this._store.select('userAuth').subscribe((state) => {
      this.user = state.user;
      this.isEnabled = this.user?.isEnabled ? true : false;
    });
 
  }
  logout(): void {
    this._store.dispatch(logoutAction());
  }
}

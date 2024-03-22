import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user?: User;
  constructor(private _store: Store<AppState>) {}
  ngOnInit(): void {
    this._store.select('userAuth').subscribe((state) => {
      this.user = state.user;
      console.log('User :', JSON.stringify(state));
    });
  }
}

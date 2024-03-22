import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user?: User;
  constructor(private _store: Store<AppState>) {}
  ngOnInit(): void {
    this._store.select('userAuth').subscribe((state) => {
      this.user = state.user;
    });
  }
}

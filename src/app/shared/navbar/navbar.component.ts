import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user?: User;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.select('userAuth').subscribe((state) => {
      this.user = state.user;
    });
  }
}

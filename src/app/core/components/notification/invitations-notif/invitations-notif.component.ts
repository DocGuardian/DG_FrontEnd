import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { NotificationType } from 'src/app/core/enums/notification.enum';
import { Notification } from 'src/app/core/models/notification.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/users/user.service';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-invitations-notif',
  templateUrl: './invitations-notif.component.html',
  styleUrls: ['./invitations-notif.component.css'],
})
export class InvitationsNotifComponent implements OnInit {
  user?: User;
  notifications!: Array<Notification>;
  errorMsg = '';

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('userAuth').subscribe((state) => {
      this.user = state.user;
    });
    this.getNotifications();
  }

  getNotifications() {
    let userId = this.user?.id as string;
    this.userService.getNotifications(userId).subscribe({
      next: (res) => {
        let notifs: Array<Notification> = res.data.response;
        this.notifications = notifs.filter(
          (n) => n.type == NotificationType.INVITATION
        );
        console.info('Inv Notifs : ', this.notifications);
      },
      error: (err) => {
        console.error('Error Inv Notifs : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { NotificationType } from 'src/app/core/enums/notification.enum';
import { Notification } from 'src/app/core/models/notification.model';
import { User } from 'src/app/core/models/user.model';
import { NotificationServiceService } from 'src/app/core/services/notification/notification-service.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user?: User;
  notifications?: Array<Notification>;
  errorMsg = '';

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private service: NotificationServiceService
  ) {}

  ngOnInit(): void {
    this.store.select('userAuth').subscribe((state) => {
      this.user = state.user;
      this.getNotifications(this.user?.id);
    });
  }

  getNotifications(id: any) {
    let userId = id as string;
    this.userService.getNotifications(userId).subscribe({
      next: (res) => {
        let notifs: Array<Notification> = res.data.response;
        this.notifications = notifs.filter((n) => n.read === false);
        console.info(' Notifications : ', this.notifications);
      },
      error: (err) => {
        console.error('Error Notification : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      },
    });
  }
}

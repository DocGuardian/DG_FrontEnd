import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { User } from '../../../models/user.model';
import { AppState } from '../../../store/state/app.state';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { Notification } from '../../../models/notification.model';
import { RoomInvitationService } from 'src/app/core/services/invitations/room-invitation.service';
import { NotificationServiceService } from 'src/app/core/services/notification/notification-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  user?: User;
  notifications!: Array<Notification>;
  errorMsg = '';
  @Output() notificationDeleted = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private service: NotificationServiceService,
    private store: Store<AppState>
  ) {}

  onDeleteNotification(notificationId: string) {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== notificationId
    );
    this.notificationDeleted.emit(notificationId);
    this.service.delete(notificationId).subscribe({
      next: (res) => {
        console.info('Delete Inv Res :', res);
      },
      error: (err) => {
        console.info('Delete Inv Error :', err);
      },
    });
  }

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
        this.notifications = res.data.response;
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

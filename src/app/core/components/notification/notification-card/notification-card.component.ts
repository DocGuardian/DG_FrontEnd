import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Notification } from 'src/app/core/models/notification.model';
import { RoomService } from 'src/app/core/services/rooms/room.service';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css'],
})
export class NotificationCardComponent {
  @Input() notification!: Notification;
  @Output() deleteClicked = new EventEmitter<string>(); // Event emitter for delete button click

  constructor(private roomService: RoomService, private route: Router) {}

  onJoin() {
    this.roomService
      .joinUser(
        this.notification.id,
        this.notification.recipient.id,
        this.notification.room?.id as string
      )
      .subscribe({
        next: (res) => {
          alert('Join : ' + JSON.stringify(res.data.response));
          this.route.navigateByUrl('dg/rooms/' + this.notification.room?.id);
          this.onDeny();
        },
        error: (err) => {
          console.log('Join User Err ', err.message);
        },
      });
  }

  onDeny() {
    this.deleteClicked.emit(this.notification.id); // Emit event with notification ID
  }
}

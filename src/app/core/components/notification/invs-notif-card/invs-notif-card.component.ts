import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/models/notification.model';
import { RoomService } from 'src/app/core/services/rooms/room.service';

@Component({
  selector: 'app-invs-notif-card',
  templateUrl: './invs-notif-card.component.html',
  styleUrls: ['./invs-notif-card.component.css'],
})
export class InvsNotifCardComponent {
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
          this.onDeny();
          this.route.navigateByUrl('dg/rooms/' + this.notification.room?.id);
        },
        error: (err) => {
          console.log('Join User Err ', err.message);
        },
      });
  }

  onDeny() {
    alert(this.notification.id);
    this.deleteClicked.emit(this.notification.id); // Emit event with notification ID
  }
}

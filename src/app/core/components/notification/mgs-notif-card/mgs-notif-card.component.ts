import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/core/models/notification.model';

@Component({
  selector: 'app-mgs-notif-card',
  templateUrl: './mgs-notif-card.component.html',
  styleUrls: ['./mgs-notif-card.component.css'],
})
export class MgsNotifCardComponent {
  @Input() notification!: Notification;
}

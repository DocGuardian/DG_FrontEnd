import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/core/models/notification.model';

@Component({
  selector: 'app-invs-notif-card',
  templateUrl: './invs-notif-card.component.html',
  styleUrls: ['./invs-notif-card.component.css'],
})
export class InvsNotifCardComponent {
  @Input() notification!: Notification;
}

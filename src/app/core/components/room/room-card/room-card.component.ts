import { Component, Input } from '@angular/core';
import { Room } from 'src/app/core/models/room.model';

@Component({
  selector: 'room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css'],
})
export class RoomCardComponent {
  @Input() room!: Room;
}

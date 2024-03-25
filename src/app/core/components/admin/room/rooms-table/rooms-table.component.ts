import { Component, Input } from '@angular/core';
import { Room } from 'src/app/core/models/room.model';

@Component({
  selector: 'app-rooms-table',
  templateUrl: './rooms-table.component.html',
  styleUrls: ['./rooms-table.component.css'],
})
export class RoomsTableComponent {
  @Input() rooms!: Array<Room>;
}

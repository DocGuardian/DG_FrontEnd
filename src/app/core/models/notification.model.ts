import { NotificationType } from '../enums/notification.enum';
import { Room } from './room.model';
import { User } from './user.model';

export interface Notification {
  id: string;
  sender: User;
  recipient: User;
  room?: Room;
  message: string;
  timestamp: Date;
  type: NotificationType;
  read: boolean;
}

export interface SendInvitationReq {
  sender: User;
  recipient: User;
  room: Room;
  message: string;
}

export interface SendMessageReq {
  sender: User;
  recipient: User;
  room: Room;
  message: string;
}

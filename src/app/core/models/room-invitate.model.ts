import { InvitationStatus } from '../enums/invitationStatus.enum';
import { Room } from './room.model';
import { User } from './user.model';

export interface RoomInviteByEmail {
  userId: string;
  email: string;
}

export interface RoomInvite {
  senderId: string;
  recipientId: string;
}

export interface Invitation {
  id: string;
  sender: User;
  recipient: User;
  room: Room;
  status: InvitationStatus;
  createdAt: Date;
  updatedAt: Date;
}

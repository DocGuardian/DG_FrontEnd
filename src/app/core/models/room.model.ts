import { RoomRoles } from '../enums/room-types.enum';
import { User } from './user.model';

export interface Room {
  id: string;
  owner: User;
  name: string;
  storage: number;
  users: Array<User>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRoom {
  id: RoomUsersId;
  permission: RoomRoles;
  createdAt: Date;
  expiredAt: Date;
}

export interface RoomUsersId {
  user_id: string;
  room_id: string;
}
export interface RoomReq {
  owner: User;
  name: string;
}

export interface PageRooms {
  content: Array<Room>;
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: boolean;
  empty: boolean;
}

import { RoomType } from '../enums/room-types.enum';
import { User } from './user.model';

export interface Room {
  id: string;
  owner: User;
  name: string;
  storage: number;
  type: RoomType;
  users: Array<User>;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomReq {
  owner: User;
  name: string;
  type: RoomType;
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

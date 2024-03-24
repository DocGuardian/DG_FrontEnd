import { DocType } from '../enums/document.enum';
import { Room } from './room.model';
import { User } from './user.model';

export interface Document {
  id: string;
  sender: User;
  room: Room;
  name: string;
  docUrl: string;
  size: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocReq {
  sender: any;
  room: any;
  name: string;
  docUrl: File;
  size: number;
  type: string;
}

export interface PageDocs {
  content: Array<Document>;
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

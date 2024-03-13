import { Role } from '../enums/roles.enum';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  imageUrl: string;
  isEnabled: boolean;
  isLocked: boolean;
  enable_tfa: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserReq {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

export interface PageUsers {
  content: Array<User>;
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

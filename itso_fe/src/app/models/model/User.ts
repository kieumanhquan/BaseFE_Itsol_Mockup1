import {Role} from './Role';
export interface User{
  id: number;
  name: string;
  email: string;
  userName: string;
  password: string;
  homeTown: string;
  avatarName: string;
  gender: string;
  birthday: Date;
  roles: Role[];
  active: boolean;
  delete: boolean;
}

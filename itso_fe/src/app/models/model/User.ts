import {Role} from './Role';
import {Unit} from './Unit';
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
  unit: Unit;
}

import {Unit} from "../../../models/model/Unit";

export class User {
  id?: string;
  fullName?: string;
  email?: string;
  userName?: string;
  phoneNumber?: string;
  homeTown?: string;
  cccd?: string;
  gender?: string;
  birthDay?: Date;
  position?: string;
  school?: string;
  salary?: number;
  unit?:Unit;
}

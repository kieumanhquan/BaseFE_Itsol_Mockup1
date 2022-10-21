import {User} from "./User";
import {Unit} from "./Unit";

export interface Transfer{
  id?:number;
  transferName?: string;
  reasonTransfer?: string;
  createdDate?: Date;
  reasonNew?: string;
  reasonOld?: string;
  isStatusNew?: number;
  isStatusOld?: number;
  isDelete?: number;
  unitNew?: Unit;
  unitOld?: Unit;
  employee?: User;
  creator?: User;
  transferDate?: Date;
  status?: number;

}

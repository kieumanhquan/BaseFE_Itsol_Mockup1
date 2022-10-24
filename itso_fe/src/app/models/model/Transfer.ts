import {User} from "./User";
import {Unit} from "./Unit";

export interface Transfer{
  id?:number;
  transferName?: string;
  reasonTransfer?: string;
  createdDate?: Date;
  cancleDate?:Date;
  successDate?:Date;
  reasonNew?: string;
  reasonOld?: string;
  isStatusNew?: number;
  isStatusOld?: number;
  isDelete?: number;
  unitNew?: Unit;
  unitOld?: Unit;
  employee?: User;
  creator?: User;
  adminReview?:User;
  transferDate?: Date;
  status?: number;

}
export interface TransferDTO{
  transferName?:string;
  reason?:string
  unitOld?:Unit;
  unitNew?:Unit;
  successDay?:Date;
}

export class User {
  id?: string;
  fullName?: string;
  email?: string;
  userName?: string;
  password?: string;
  cccd?: string;
  literacy?: string;
  phoneNumber?: string;
  homeTown?: string;
  avatarName?: string;
  salary?: number;
  gender?: string;
  position?: string;
  leader?: boolean;
  birthDay?: Date;
  delete?: boolean;
  active?: boolean;
  school?: string;
  unit?: Unit;
}

export interface Unit {
  id?: number;
  name?: string;
  status?: boolean;
}

export interface Transfer {
  id?: number;
  transferName?: string;
  reasonTransfer?: string;
  createdDate?: Date;
  cancleDate?: Date;
  successDate?: Date;
  reasonNew?: string;
  reasonOld?: string;
  isStatusNew?: number;
  isStatusOld?: number;
  isDelete?: number;
  unitNew?: Unit;
  unitOld?: Unit;
  employee?: User;
  creator?: User;
  adminReview?: User;
  transferDate?: Date;
  status?: number;

}

export interface UserDTO {
  fullName?: string;
  email?: string;
  literacy?: string;
  position?: string;
  salary?: number;
  birthDay?: Date;
  unit?: Unit;
}

export interface TransferDTO {
  name?: string;
  reason?: string;
  unitOld?: Unit;
  unitNew?: Unit;
  successDay?: Date;
  sortMultileColummList?: SortMultileColumm[];
}
export interface SortMultileColumm {
  name?: string;
  type?: string;
}




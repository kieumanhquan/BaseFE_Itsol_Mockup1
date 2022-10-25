import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../../services/TransferService';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../@core/services/user.service';
import { ProfileService } from '../../profile/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/UnitService';
import { Unit } from '../../../../models/model/Unit';
import { Transfer, User } from '../../employee/employee.model';
import { SessionService } from '../../../../@core/services/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-transfer-update',
  templateUrl: './transfer-update.component.html',
  styleUrls: ['./transfer-update.component.scss'],
})
export class TransferUpdateComponent implements OnInit {
  transfer: Transfer;
  idTransfer: number;
  userLogin: User;
  userCreator: any;
  formTransfer: FormGroup;
  units: Unit[];
  userTransfer: User;
  dmUnitOld: User;
  dmUnitNew: User;
  cancleReview = false;
  userName: string;


  constructor(
    private transferService: TransferService,
    private router: Router,
    private activated: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService,
    private unitService: UnitService,
    private fb: FormBuilder,
    private sesstionService: SessionService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    // transfer click
    this.activated.paramMap.subscribe(params => {
      this.idTransfer = parseInt(params.get('id'), 10);
      if (this.idTransfer != null) {
        this.transferService.getTransferById(this.idTransfer).subscribe(res => {
          this.transfer = res;
          //lay ra nhan vien dieu chuyen
          this.userTransfer = res.employee;
          //lay ra hr tao dieu chuyen
          this.userCreator = res.creator;
          this.isCancelReview();
          //lay dmunitOld
          // eslint-disable-next-line @typescript-eslint/no-shadow
          this.userService.getDMByUnit(this.transfer.unitOld.id).subscribe(res => {
            this.dmUnitOld = res;
          });
          // lay ra dm unit new
          // eslint-disable-next-line @typescript-eslint/no-shadow
          this.userService.getDMByUnit(this.transfer.unitNew.id).subscribe(res => {
            this.dmUnitOld = res;
          });
          //
          this.updateForm();
          //


        });
      }
    });

    //user dang nhap
    this.userName = this.sesstionService.getItem('auth-user');
    this.profileService.getProfileByUserName(this.userName).subscribe(res => {
      this.userLogin = res;
      console.log(res);
    });
    //mang unit
    this.unitService.findAllUnit().subscribe(res => {
      this.units = res;
    });
    //init form

    //update form




  }
  initForm() {
    this.formTransfer = this.fb.group({
      transferName: ['', [Validators.required, Validators.maxLength(200)]],
      unitNew: ['', Validators.required],
      reasonTransfer: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }
  updateForm() {
    this.formTransfer.patchValue({
      transferName: this.transfer.transferName,
      unitNew: this.transfer.unitNew,
      reasonTransfer: this.transfer.reasonTransfer,
    });
  }
  isCancelReview() {
    if (this.transfer.status > 1) {
      this.cancleReview = false;
      return;
    }
    const jwtDecode = this.userService.getDecodedAccessToken();
    const role = jwtDecode.auth.split(',');
    // admin
    if (role.includes('ROLE_ADMIN')) {
      this.cancleReview = true;
      console.log(this.cancleReview);
      return;
    }
    if (this.transfer.isStatusOld === 0 && this.transfer.status === 0) {
      this.cancleReview = (this.dmUnitOld.id === this.userLogin.id);
      return;
    }
    if (this.transfer.isStatusNew === 0 && this.transfer.status === 1) {
      this.cancleReview = (this.dmUnitNew.id === this.userLogin.id);
    }
  }
  //đoc du lieu tu form
  updateFormV2() {
    const formValue = this.formTransfer.value;
    console.log(formValue.transferName);
    this.transfer.transferName = formValue.transferName;
    this.transfer.reasonTransfer = formValue.reasonTransfer;
    this.transfer.unitNew = formValue.unitNew;
  }

  submit() {
    this.updateFormV2();
    this.transferService.updateTransfer(this.transfer).subscribe(res => {
      this.toastr.success('Cập nhật thành công');
    }, error => {
      this.toastr.error('Cập nhật thất bại');
    });
  }


  confirm() {
    const jwtDecode = this.userService.getDecodedAccessToken();
    const role = jwtDecode.auth.split(',');

    if (role.includes('ROLE_ADMIN')) {
      this.transfer.status = 4;
      this.transfer.transferDate = new Date();
      this.update(this.transfer);
    } else if (role.includes('ROLE_DM')) {
      if (this.transfer.status === 0 && this.transfer.successDate == null) {
        this.transfer.status = 1;
        this.transfer.isStatusOld = 1;
        this.transfer.successDate = new Date();
        this.update(this.transfer);
      } else if (this.transfer.status === 1 && this.transfer.successDate != null) {
        this.transfer.status = 4;
        this.transfer.isStatusNew = 1;
        this.transfer.transferDate = new Date();
        this.update(this.transfer);
      }
    }



  }
  //Hủy
  cancel() {
    this.transfer.status = 3;
    console.log('chung');
    this.transferService.updateTransfer(this.transfer).subscribe(res => {
      this.toastr.success('Hủy thành công');
    }, error => {
      this.toastr.error('Thất bại');
    });

  }
  //từ chối
  refuse() {
    const jwtDecode = this.userService.getDecodedAccessToken();
    const role = jwtDecode.auth.split(',');
    if (role.includes('ROLE_ADMIN')) {
      this.transfer.status = 2;
      this.update(this.transfer);
    } else if (role.includes('ROLE_DM')) {
      if (this.transfer.status === 0 && this.transfer.cancleDate == null) {
        this.transfer.status = 2;
        this.transfer.isStatusOld = 2;
        this.transfer.cancleDate = new Date();
        this.update(this.transfer);
      } else if (this.transfer.status === 1 && this.transfer.cancleDate == null) {
        this.transfer.status = 2;
        this.transfer.isStatusNew = 1;
        this.transfer.cancleDate = new Date();

      }
    }
  }
  //cập nhật creator
  update(transfer: Transfer) {
    this.transferService.updateTransfer(this.transfer).subscribe(res => {
      this.toastr.success('Cập nhật thành công');
    }, error => {
      this.toastr.error('Thất bại');
    });
  }
}


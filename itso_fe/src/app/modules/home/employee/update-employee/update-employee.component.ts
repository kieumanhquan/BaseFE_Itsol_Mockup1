import { User, Unit, Transfer } from './../employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from './../../profile/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {UserService} from './../../../../@core/services/user.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { UnitService } from '../../../../services/UnitService';
import { TransferService } from '../../../../services/TransferService';

@Component({
  selector: 'ngx-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
  formEdit: FormGroup;
  id: any;
  user: User;
  datas1: Unit[] = [];
  check: boolean;
  checkAcitve: boolean;
  content: any;
  units: Unit[];
  transfer: Transfer = {};
  formTransfer: FormGroup;
  formUpdateTransfer: FormGroup;
  userTransfer: User;
  creator: User;
  username: string;
  unitOld: Unit;
  dmUnitOld: User;
  dmUnitNew: User;
  isCheck: boolean;


  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private  toastr: ToastrService,
    private activedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private unitService: UnitService,
    private transferService: TransferService,
    private employeeService: EmployeeService,
    private userActive: UserService,
  ) {
  }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      // eslint-disable-next-line max-len
      // password: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      fullName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      cccd: ['', [Validators.required, Validators.pattern('[0-9]{9,12}')]],
      homeTown: ['', Validators.required],
      salary: ['', Validators.required],
      literacy: ['', Validators.required],
      gender: ['', Validators.required],
      birthDay: ['', Validators.required],
      isActive: ['', Validators.required],
      unit: ['', Validators.required],
      position: ['', Validators.required],
      isLeader: ['', Validators.required],
    });



    this.activedRoute.paramMap.subscribe(
      params => {
        const idUser = params.get('id');
        this.id= idUser;
        if (idUser) {
          this.employeeService.getUserById(idUser).subscribe(
            res => {
              this.user = res;
              this.checkAcitve = this.user.active;
              this.fillValueForm();
              console.log(!this.formEdit.value.isActive);
            },
          );
        }

      },
    );

    this.initForm();

    console.log(this.userActive.getDecodedAccessToken());
    this.checkDm();
    this.checkHr();
    this.checkDmHr();

  }

  openLg(content, id: any) {
    this.getUserById(id);
    this.findUnitNotJoinUser(id);
    this.modalService.open(content, { size: 'lg', centered: true,  scrollable: true });
  };

  public findUnitNotJoinUser(id: any){
    this.unitService.findUnitNotJoinUser(id).subscribe(
      (data: any) => {
        this.units = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  initForm() {
    this.formTransfer = this.fb.group({
      transferName: ['', [Validators.required, Validators.maxLength(200)]],
      unitNew: ['', Validators.required],
      reasonTransfer: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }


  saveTransfer(){
    this.addTransfer();
    this.transferService.createTransfer(this.transfer).subscribe(res=>{
      this.toastr.success('Thêm mới thành công');
    }, error => {
      this.toastr.error(error.message());
    });
    this.modalService.dismissAll();
  }
  addTransfer(){
    const formValue = this.formTransfer.value;
    console.log(formValue.transferName);
    this.transfer.transferName = formValue.transferName;
    this.transfer.reasonTransfer = formValue.reasonTransfer;
    this.transfer.unitNew = formValue.unitNew;
    // @ts-ignore
    this.transfer.creator = this.creator;
    // @ts-ignore
    this.transfer.employee = this.userTransfer;

  }

  getUserById(id: number){
    this.profileService.getUserById(id).subscribe(
      (res)=>{
        this.userTransfer = res;
        this.unitOld = this.userTransfer.unit;
        console.log(this.unitOld);
        console.log(this.userTransfer);
      });
  }



  update(){
    this.addValueUser();
    console.log(this.addValueUser());
    console.log(this.user);
    this.employeeService.updateUser(this.id,this.user).subscribe(
      res => {
        // this.toastr.success(res.message());
        this.toastr.success('Cập nhật thành công');
         this.router.navigate(['/home/employee']).then(r => console.log(r));
      },error => {
        if (error.error.message === 'Username đã tồn tại') {
          this.toastr.error(error.error.message);
        } else if (error.error.message === 'Email đã tồn tại') {
          this.toastr.error(error.error.message);
        } else if (error.error.message === 'Phone đã tồn tại') {
          this.toastr.error(error.error.message);
        }
      },
    );
  }

  fillValueForm() {

    this.formEdit.patchValue({
      fullName: this.user.fullName,
      email: this.user.email,
      userName: this.user.userName,
      cccd: this.user.cccd,
      literacy: this.user.literacy,
      phoneNumber: this.user.phoneNumber,
      homeTown: this.user.homeTown,
      salary: this.user.salary,
      gender: this.user.gender,
      position: this.user.position,
      // eslint-disable-next-line eqeqeq
      isLeader: this.user.leader == true? 'Lead':'Notlead',
      birthDay: this.user.birthDay,
      // eslint-disable-next-line eqeqeq
      isActive: this.user.active == true? 'Active' :'NotActive',
      unit: this.user.unit.name,
    });
  }


  addValueUser() {
    this.user.fullName = this.formEdit.value.fullName;
    this.user.email = this.formEdit.value.email;
    this.user.userName = this.formEdit.value.userName;
    this.user.password = this.formEdit.value.password;
    this.user.cccd = this.formEdit.value.cccd;
    this.user.literacy = this.formEdit.value.literacy;
    this.user.phoneNumber = this.formEdit.value.phoneNumber;
    this.user.homeTown = this.formEdit.value.homeTown;
    this.user.salary = this.formEdit.value.salary;
    this.user.gender = this.formEdit.value.gender;
    this.user.position = this.formEdit.value.position;
    // eslint-disable-next-line eqeqeq
    if (this.formEdit.value.isLeader == 'Lead') {
      this.user.leader = true;
    } else {
      this.user.leader = false;
    }
    this.user.birthDay = this.formEdit.value.birthDay;
    this.user.delete = this.formEdit.value.isDelete;
    // eslint-disable-next-line eqeqeq
    if (this.formEdit.value.isActive == 'Active') {
      this.user.active = true;
    } else {
      this.user.active = false;
    }

  }

  checkDm(){
    // eslint-disable-next-line eqeqeq
    if(this.userActive.getDecodedAccessToken().auth == 'ROLE_DM'){
      return true;
    } else {
      return false;
    }
  }

  checkDmHr(){
    // eslint-disable-next-line eqeqeq
    if(this.userActive.getDecodedAccessToken().auth =='ROLE_DM_HR'){
      return true;
    } else {
      return false;
    }
  }
  checkHr(){
    // eslint-disable-next-line eqeqeq
    if(this.userActive.getDecodedAccessToken().auth =='ROLE_HR'){
      return true;
    } else {
      return false;
    }
  }


  deactivated(){
    this.employeeService.deactivated(this.id).subscribe(
      res => {
         this.toastr.success(res.message);
       // this.toastr.success("Cập nhật thành công")
        this.router.navigate(['/admin/user']).then(r => console.log(r));
      },error => {
        console.log(error);
        });
}
}




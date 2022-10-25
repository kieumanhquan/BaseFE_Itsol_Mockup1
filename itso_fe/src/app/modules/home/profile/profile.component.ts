
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../../../@core/services/session.service';
import { User } from './profile.model';
import { ProfileService } from './profile.service';
import {ToastrService} from 'ngx-toastr';
import {EmployeeService} from "../employee/employee.service";


@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  user: User;
  username: string;
  userId: number;

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private  toastr: ToastrService,
    private  employeeService: EmployeeService,

  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getByUserName();
    this.initForm();
  }
  initForm(){
    this.formProfile = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthDay: ['', Validators.required],
      homeTown: ['', Validators.required],
      gender: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  getByUserName(){
    this.username=this.sessionService.getItem('auth-user');
    this.profileService.getProfileByUserName(this.username).subscribe(
      (res)=>{
        this.updateForm(res);
        this.user = res;
        this.userId = res.id;


      });
  }

  updateForm(user: User): void {
    this.formProfile.patchValue({

      fullName:user.fullName,
      email:user.email,
      phoneNumber:user.phoneNumber,
      birthDay:user.birthDay,
      homeTown:user.homeTown,
      gender: user.gender,
      position: user.position,
    });

  }
  onSubmit(){
      this.updateUser();
      this.employeeService.updateUser(this.userId,this.user).subscribe((res: any)=>{
        this.toastr.success('Update thành công');
      });
  }
  updateUser(){
    const newUser = this.formProfile.value;
    this.user.fullName =newUser.fullName;
    this.user.email = newUser.email;
    this.user.phoneNumber = newUser.phoneNumber;
    this.user.birthDay = newUser.birthDay;
    this.user.homeTown = newUser.homeTown;
    console.log(newUser);
  }


}

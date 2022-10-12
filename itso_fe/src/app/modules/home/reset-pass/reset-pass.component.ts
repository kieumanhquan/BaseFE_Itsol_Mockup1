import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordBean} from "./reset-pass.model";
import {ProfileService} from "../profile/profile.service";
import {SessionService} from "../../../@core/services/session.service";
import {ToastrService} from "ngx-toastr";
import {ResetPassService} from "./reset-pass.service";

@Component({
  selector: 'ngx-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  formChange: FormGroup;
  passwordBean: PasswordBean = new class implements PasswordBean {
    confirmPassword: string;
    passwordNew: string;
    passwordOld: string;
  }
  username: any;
  user: any;

  constructor(
    private changeUser: ResetPassService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private sessionService: SessionService,
    private  toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.username = this.sessionService.getItem('auth-user');
    this.profileService.getProfileByUserName(this.username).subscribe(req => {
      this.user = req;
    })
  }

  initForm() {
    this.formChange = this.fb.group({
      passwordNew: ['', Validators.required],
      passwordOld: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  updatePass() {
    // this.change_passwordService.updateUser()
    this.updatePassWordBean();
    this.changeUser.updateUser(this.user.id, this.passwordBean).subscribe(req=>{
      this.toastr.success("Update thành công");
    });

  }

  updatePassWordBean() {
    let passChange = this.formChange.value;
    this.passwordBean.passwordNew = passChange.passwordNew;
    this.passwordBean.passwordOld = passChange.passwordOld;
    this.passwordBean.confirmPassword = passChange.confirmPassword;

  }

}

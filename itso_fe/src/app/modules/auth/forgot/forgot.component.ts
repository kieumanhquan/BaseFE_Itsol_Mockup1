import { ForgotService } from './forgot.service';
import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AuthService} from '../../../@core/services/auth.service';
import {Router} from '@angular/router';

export interface User{
  email?: string;
  otp?: number;
}
@Component({
  selector: 'ngx-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  cpi: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private readonly router: Router,
    private forgotService: ForgotService,
  ) {
  }


  ngOnInit() {
    this.cpi = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      otp: [''],
    });
  }


  public sendOtp() {
    this.forgotService.sendOTP(this.cpi.value.email).subscribe(
      (res) => {
        alert('Email da gui thanh cong!');
        localStorage.setItem('id', res.object.id);
        console.log(res.object.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public checkOtp() {
    this.forgotService.check(localStorage.getItem('id'), this.cpi.value.otp).subscribe(
      (res) => {
        alert('OTP chính xác!');
        this.router.navigate(['/auth/changepass']).then(r => console.log(r));
      },
      error => {
        if (error.error.message === 'Mã OTP không đúng') {
          alert(error.error.message);
        } else if (error.error.message === 'Otp này đã hết hạn!') {
          alert(error.error.message);
        }
      },
    );
  }
}

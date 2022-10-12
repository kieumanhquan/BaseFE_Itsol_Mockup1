import { ForgotService } from './forgot.service';
import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../@core/services/auth.service';
import {Router} from '@angular/router';

export interface User{
  email?: string;
  password?: string;
}
@Component({
  selector: 'ngx-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  email=new FormControl('');
  otp = new FormControl('');
  cpi: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private readonly router: Router,
    private forgotService: ForgotService,
  ) { }


  //@Output() dataevent = new EventEmitter<string>();

  ngOnInit(){
    this.cpi = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
    });
  }


  public sendOtp(){
    this.forgotService.sendOTP(this.cpi.value.email).subscribe(
      (res)=> {
        window.sessionStorage.setItem('email',this.cpi.value.email);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },

    );
  }

  public checkOtp(){

  }
}

import { ForgotService } from './forgot.service';
import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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


  email = new FormControl('');
  otp = new FormControl('');
  constructor(
    private forgotService: ForgotService,
   ) { }

  ngOnInit(): void {
  }

  getOtp(){
    console.log(this.email.value);
    this.forgotService.putChangepass(this.email.value).subscribe(
      (res)=>{
      });
  }
}

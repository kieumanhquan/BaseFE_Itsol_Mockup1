import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  email = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

  getOtp(){
    window.location.href= '/!';
    alert(this.email.value);
  }

  confirm(){
    window.location.href= '/!';
    alert(this.email.value);
  }

}

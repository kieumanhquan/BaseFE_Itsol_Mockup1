import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';


export interface User{
  email?: string;
  password?: string;
}
@Component({
  selector: 'ngx-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss'],
})
export class ChangepassComponent implements OnInit {

  password = new FormControl('');
  private forgotService: any;
  private email: string;
  constructor() { }

  ngOnInit(): void {
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  user: User= null;
  confirm(){
    this.user.email = this.email;
    this.user.password = this.password.value;
    this.forgotService.putChangepass(this.email).subscribe(
      (res)=>{
        alert('Cap nhat thanh cong');
      });
    window.location.href= '/!';
  }
}

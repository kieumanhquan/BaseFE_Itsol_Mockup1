import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../@core/services/auth.service';
import {Router} from '@angular/router';
import {ChangepassService} from './changepass.service';

@Component({
  selector: 'ngx-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss'],
})
export class ChangepassComponent implements OnInit {

  cpc: FormGroup;
  private changepassService: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private readonly router: Router,
              private changePassword: ChangepassService) {
  }


  ngOnInit() {
    this.cpc = this.fb.group({
      // eslint-disable-next-line max-len
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      // eslint-disable-next-line max-len
      repassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.cpc.controls;
  }

  public changePassWord() {
    this.changePassword.change(localStorage.getItem('id'), this.cpc.value.password).subscribe(
      (res) => {
        alert(res.message);
        this.router.navigate(['/auth']).then(r => console.log(r));
      },
      (error) => {
        console.log(error);
        alert(error.error?.message);
      },
    );
  }
}

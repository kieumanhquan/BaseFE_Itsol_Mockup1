import { UserService } from './../../../@core/services/user.service';
import { Router } from '@angular/router';
import { TokenService } from './../../../@core/services/token.service';
import { AuthService } from './../../../@core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getUser().roles;
    }
  }


  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.formLogin.controls;
  }

  onSubmit() {
    console.log(this.formLogin.value);
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          const jwtDecode = this.userService.getDecodedAccessToken();
          this.tokenService.saveUser(jwtDecode.sub);
          // this.roles = this.tokenService.getUser().roles;
          this.router.navigate(['/home/']);
        },
      );
    }
  }
}





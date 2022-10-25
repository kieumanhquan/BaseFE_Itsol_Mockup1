import { SessionService } from './../../../@core/services/session.service';
import { ProfileService } from './../../home/profile/profile.service';
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
    private userService: UserService,
    private sessionService: SessionService,
    private profileService: ProfileService) {
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

  // get f() {
  //   return this.formLogin.controls;
  // }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          const jwtDecode = this.userService.getDecodedAccessToken();
          this.tokenService.saveUser(jwtDecode.sub);
          const role = jwtDecode.auth.split(',');
          this.saveUserId();
          if (localStorage.getItem('auth-token')
            && (role.includes('ROLE_ADMIN') || role.includes('ROLE_DM')
              || role.includes('ROLE_HR') || role.includes('ROLE_DM_HR'))) {
            this.router.navigate(['/home/']);
            return;
          }
          // this.roles = this.tokenService.getUser().roles;
          this.router.navigate(['/home/employee']);
        },
      );
    }
  }


  saveUserId() {
    const username = this.sessionService.getItem('auth-user');
    console.log(username);
    this.profileService.getProfileByUserName(username).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('id-user', res.id);
      });
  }
}





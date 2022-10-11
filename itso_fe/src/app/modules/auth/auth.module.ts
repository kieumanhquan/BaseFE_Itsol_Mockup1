import { ChangepassComponent } from './changepass/changepass.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { FormOtpComponent } from './form-otp/form-otp.component';
import { ChangepassComponent } from './forgot/changepass/changepass.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: '',
      component: LoginComponent,
    },
    {
      path: 'forgotpass',
      component: ForgotComponent,
    },
  ],
}];

@NgModule({
  declarations: [
    AuthComponent,
    ForgotComponent,
    LoginComponent,
    ChangepassComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {
}

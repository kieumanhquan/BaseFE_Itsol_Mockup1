import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { PrimengModule } from '../../shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransferComponent } from './transfer/transfer.component';
import { ContractComponent } from './contract/contract.component';
import { EmployeeComponent } from './employee/employee.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';



const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'transfer',
      component: TransferComponent,
    },
    {
      path: 'contract',
      component: ContractComponent,
    },
    {
      path: 'employee',
      component: EmployeeComponent,
    },
    {
      path: 'change-password',
      component: ResetPassComponent,
    },
    {
      path: 'edit/:id',
      component: UpdateEmployeeComponent,
    },
  ],
}];


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    TransferComponent,
    ContractComponent,
    EmployeeComponent,
    ResetPassComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    HttpClientModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
  ],
})
export class HomeModule { }

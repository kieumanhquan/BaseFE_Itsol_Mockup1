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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContractComponent } from './contract/contract.component';
import { EmployeeComponent } from './employee/employee.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CheckpointComponent } from './checkpoint/checkpoint.component';
import {TransferComponent} from './transfers/transfer/transfer.component';
import {TransferUpdateComponent} from './transfers/transfer-update/transfer-update.component';
import {UpdateEmployeeComponent} from './employee/update-employee/update-employee.component';
import { ReviewSalaryComponent } from './checkpoint/review-salary/review-salary.component';


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
    {
      path: 'checkpoint',
      component: CheckpointComponent,
    },
    {
      path: 'update-transfer/:id',
      component: TransferUpdateComponent,
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
    CheckpointComponent,
    TransferUpdateComponent,
    ReviewSalaryComponent,
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
    MatButtonModule,
    MatTableModule,

  ],
})
export class HomeModule { }

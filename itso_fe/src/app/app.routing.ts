
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './@core/guards/auth.guard';
import {ForgotComponent} from './modules/auth/forgot/forgot.component';
import {TransferComponent} from "./modules/home/transfer/transfer.component";

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '**',
    redirectTo: 'home',
  },
  { path: 'login',
    component: ForgotComponent,
  },
  { path: 'forgotpass',
    component: ForgotComponent,
  },
  {
    path:'transfer',
    component: TransferComponent,
  }
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin-pages/admin/admin.component';
import { DashboardAdminHomeComponent } from './pages/admin-pages/dashboard-admin-home/dashboard-admin-home.component';
import { DashboardHomeComponent } from './pages/user-pages/dashboard-home/dashboard-home.component';
import { DashboardComponent } from './pages/user-pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { IcafeManagementComponent } from './pages/admin-pages/icafe-management/icafe-management.component';
import { ListDetailComponent } from './pages/user-pages/list-detail/list-detail.component';
import { ListComponent } from './pages/user-pages/list/list.component';
import { OrderStatusComponent } from './pages/user-pages/order-status/order-status.component';
import { SignupComponent } from './pages/signup/signup.component';

import { AuthGuard } from './guards/auth.guard';
import { OrderStatusAdminComponent } from './pages/admin-pages/order-status-admin/order-status-admin.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: DashboardHomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list',
        component: ListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list/detail',
        component: ListDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'status',
        component: OrderStatusComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin-dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: DashboardAdminHomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-list',
        component: OrderStatusAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-management',
        component: IcafeManagementComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

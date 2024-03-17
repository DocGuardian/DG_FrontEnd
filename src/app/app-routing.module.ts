import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/auth/login/login.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { HomeComponent } from './core/components/home/home.component';
import { ProfileComponent } from './core/components/user/profile/profile.component';
import { AccountSettingsLayoutComponent } from './shared/layouts/account-settings-layout/account-settings-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    //canActivate: [NoAuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },

  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [NoAuthGuard],
  },
  {
    path: 'account-settings',
    component: AccountSettingsLayoutComponent,
    //canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

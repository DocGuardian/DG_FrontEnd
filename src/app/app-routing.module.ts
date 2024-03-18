import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/auth/login/login.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { HomeComponent } from './core/components/home/home.component';
import { ProfileComponent } from './core/components/user/profile/profile.component';
import { AccountSettingsLayoutComponent } from './shared/layouts/account-settings-layout/account-settings-layout.component';
import { GetStartedComponent } from './shared/layouts/get-started/get-started.component';
import { DocumentsComponent } from './core/components/user/documents/documents.component';

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
    path: 'account-settings',
    component: AccountSettingsLayoutComponent,
    //canActivate: [NoAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [NoAuthGuard],
  },

  {
    path: 'dg',
    component: GetStartedComponent,
    //canActivate: [NoAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'documents',
        component: DocumentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

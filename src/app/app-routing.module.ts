import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/auth/login/login.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { HomeComponent } from './core/components/home/home.component';
import { ProfileComponent } from './core/components/user/profile/profile.component';
import { GetStartedComponent } from './shared/layouts/get-started/get-started.component';
import { DocumentsComponent } from './core/components/user/documents/documents.component';
import { RoomsComponent } from './core/components/room/rooms/rooms.component';
import { RoomsComponent as Rm } from './core/components/admin/room/rooms/rooms.component';

import { RoomDetailsComponent } from './core/components/room/room-details/room-details.component';
import { AlreadyAuthGuard } from './core/guards/user/already-auth.guard';
import { AuthGuard } from './core/guards/user/auth.guard';
import { AccountNotActivatedComponent } from './core/components/account/account-not-activated/account-not-activated.component';
import { NotificationsComponent } from './core/components/notification/notifications/notifications.component';
import { NotificationLayoutComponent } from './shared/layouts/notification-layout/notification-layout.component';
import { InvitationsNotifComponent } from './core/components/notification/invitations-notif/invitations-notif.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './core/components/admin/auth/auth.component';
import { UsersComponent } from './core/components/admin/user/users/users.component';
import { AccountValidationComponent } from './core/components/auth/account-validation/account-validation.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AlreadyAuthGuard],
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
    path: 'auth/account-verification/:token',
    component: AccountValidationComponent,
  },
  {
    path: 'admin/auth',
    component: AuthComponent,
  },

  {
    path: 'dg/admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
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
      {
        path: 'rooms',
        component: Rm,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'account-not-activated',
    component: AccountNotActivatedComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'dg',
    component: GetStartedComponent,
    canActivate: [AuthGuard],
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
      {
        path: 'rooms',
        component: RoomsComponent,
      },
    ],
  },

  {
    path: 'dg/rooms/:roomId',
    component: RoomDetailsComponent,
  },

  {
    path: 'notifications',
    component: NotificationLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
      },
      {
        path: 'all',
        component: NotificationsComponent,
      },

      {
        path: 'invitations',
        component: InvitationsNotifComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

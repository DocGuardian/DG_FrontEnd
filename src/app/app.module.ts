import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { HomeComponent } from './core/components/home/home.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './core/store/state/app.state';
import { UserEffect } from './core/store/users/user.effect';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([UserEffect]),
    AppRoutingModule
  ],
  providers: [
    // provide: HTTP_INTERCEPTORS,
    // useClass: JwtInterceptor,
    // multi: true,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

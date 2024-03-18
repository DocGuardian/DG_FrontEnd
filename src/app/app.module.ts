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
import { ProfileComponent } from './core/components/user/profile/profile.component';
import { AccountSettingsLayoutComponent } from './shared/layouts/account-settings-layout/account-settings-layout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeroComponent } from './shared/hero/hero.component';
import { HowItWorksComponent } from './shared/how-it-works/how-it-works.component';
import { MainFeaturesComponent } from './shared/main-features/main-features.component';
import { GetStartedComponent } from './shared/layouts/get-started/get-started.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AccountSettingsLayoutComponent,
    HomeComponent,
    AdminLayoutComponent,
    MainLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminLayoutComponent,
    ProfileComponent,

    NavbarComponent,
    HeroComponent,
    HowItWorksComponent,
    MainFeaturesComponent,
    GetStartedComponent,
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { 
  MatProgressBarModule, 
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,

} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { HttpTokenInterceptor } from 'src/app/core/interceptors/http.token.interceptor';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('655614670094-2ih1iq5tgc933s7ft3p4ilibus62u030.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1420022831488775'),

  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    SocialLoginModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  providers: [AuthenticationService, AuthGuard, MatNativeDateModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
})
export class LoginModule { }

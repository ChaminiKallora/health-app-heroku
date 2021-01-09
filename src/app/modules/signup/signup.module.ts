import { SignUpRoutingModule } from './signup-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './pages/signup/signup.component';
import { 
  MatProgressBarModule, 
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatIconModule,
  MatButtonModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatStepperModule,

} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule, FacebookLoginProvider, LoginOpt } from 'angularx-social-login';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HttpTokenInterceptor } from 'src/app/core/interceptors/http.token.interceptor';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

const fbLoginOptions: LoginOpt = {
  scope: 'email,user_birthday',
  return_scopes: true,
  enable_profile_selector: true
}; 
 
const googleLoginOptions: LoginOpt = {
  scope: 'https://www.googleapis.com/auth/user.birthday.read'
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('655614670094-2ih1iq5tgc933s7ft3p4ilibus62u030.apps.googleusercontent.com', googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1575061362646333', fbLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSnackBarModule,
    SocialLoginModule,
    MatAutocompleteModule,
    MatStepperModule
  ],
  providers: [AuthGuard, 
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
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
export class SignupModule { }

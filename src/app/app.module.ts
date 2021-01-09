import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './modules/login/login.module';
import { SignupModule } from './modules/signup/signup.module';
import { AuthenticationService } from './core/authentication/authentication.service';
import { AuthService } from 'angularx-social-login';
import { StressModule } from './modules/stress/stress.module';
import { DiabetesModule } from './modules/diabetes/diabetes.module';
import { HeartDiseaseModule } from './modules/heart-disease/heart-disease.module';
import { SpondyloarthritisModule } from './modules/spondyloarthritis/spondyloarthritis.module';
import { MainModule } from './modules/main/main.module';
import { ProfileModule } from './modules/profile/profile.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    CoreModule,
    StressModule,
    DiabetesModule,
    HeartDiseaseModule,
    SpondyloarthritisModule,
    MainModule,
    ProfileModule
  ],
  providers: [
    AuthService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

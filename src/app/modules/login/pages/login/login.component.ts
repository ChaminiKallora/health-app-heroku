import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = SocialUser;
  err: any;
  hide: any;

  errorMsg: String;
  loginForm: FormGroup;
  loginFormValid: boolean;
  loginFormEmailValid: boolean = true;
  loginFormPasswordValid: boolean = true;
  isSubmitting: boolean = false;

  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    private _socialAuthService: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  facebookLogin() {
    this.isSubmitting = true;
    this.loginForm.disable();
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.facebookLoginUser(userData);
    }).catch(
      (err) => {
        this.err = err;
        this.isSubmitting = false;
        this.loginForm.enable();
      }
    )
  }

  googleLogin() {
    this.isSubmitting = true;
    this.loginForm.disable()
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.googleLoginUser(userData);
    }).catch(
      (err) => {
        this.err = err;
        this.isSubmitting = false;
        this.loginForm.enable();
      }
    )
  }

  loginUser() {

    if (!this.loginForm.valid) {
      return;
    }

    this.isSubmitting = true;
    this.loginForm.disable()
    this._auth.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          this.loginFormValid = true;
          localStorage.setItem('token', res.token)
          localStorage.setItem('email', this.loginForm.value.email);
          this._router.navigate(['/'])
          this.isSubmitting = false;
        },
        (err: HttpErrorResponse) => {

          switch (err.status) {
            case 0: this.openSnackBar("Network error occured !", "close"); break;
          }

          this.loginForm.enable()

          if (err.error.message == 'Invalid Password') {
            this.loginFormEmailValid = true;
            this.loginFormPasswordValid = false;
            this.errorMsg = err.error.message;
            // this._router.navigate(['/'])
            this.openSnackBar(err.error.message, "close");
          }
          else if (err.error.message == 'Invalid Email') {
            this.loginFormEmailValid = false;
            this.errorMsg = err.error.message;
            // this._router.navigate(['/'])
            this.openSnackBar(err.error.message, "close");
          }
          else {
            this.loginFormValid = false;
            this.errorMsg = err.error.message;
            // this._router.navigate(['/'])
          }

          this.isSubmitting = false;

        }
      )
  }

  googleLoginUser(userData) {
    console.log('hi')
    const email = userData.email;
    this._auth.googleLogin({ token: userData.idToken })
      .subscribe(
        res => {
          this.loginFormValid = true;
          localStorage.setItem('token', res.token)
          localStorage.setItem('email', email)
          this._router.navigate(['/'])
          this.isSubmitting = false;

        },
        (err: HttpErrorResponse) => {

          switch (err.status) {
            case 0: this.openSnackBar("Network error occured !", "close"); break;
          }

          this.loginForm.enable()

          if (err.error.message == 'Invalid Email') {
            this.loginFormEmailValid = false;
            this.errorMsg = err.error.message;
            //this._router.navigate(['/'])
            this.openSnackBar(err.error.message, "close");
          }
          else {
            this.loginFormValid = false;
            this.errorMsg = err.error.message;
            //this._router.navigate(['/'])
          }

          this.isSubmitting = false;

        }
      )
  }

  facebookLoginUser(userData) {
    const email = userData.email;
    this._auth.facebookLogin({ token: userData.authToken + " " + userData.email })
      .subscribe(
        res => {
          this.loginFormValid = true;
          localStorage.setItem('token', res.token)
          localStorage.setItem('email', email)
          this._router.navigate(['/'])
          this.isSubmitting = false;

        },
        (err: HttpErrorResponse) => {

          switch (err.status) {
            case 0: this.openSnackBar("Network error occured !", "close"); break;
          }

          this.loginForm.enable()

          if (err.error.message == 'Invalid Email') {
            this.loginFormEmailValid = false;
            this.errorMsg = err.error.message;
            //this._router.navigate(['/'])
            this.openSnackBar(err.error.message, "close");
          }
          else {
            this.loginFormValid = false;
            this.errorMsg = err.error.message;
            //this._router.navigate(['/'])
          }

          this.isSubmitting = false;

        }
      )
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }

  $(element: string) {
    return this.loginForm.get(element)
  }

}

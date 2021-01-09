import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  errorMsg: String;
  successMsg: String;
  resetToken: null;
  userEmail: null;
  currentState: any;
  resetPasswordFormValid: boolean;


  count = 5;
  isSubmitting: boolean;
  isSuccess: boolean;
  interval;

  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.currentState = 'Wait';
    this.route.params.subscribe(params => {
      this.resetToken = params.token;
      this.userEmail = params.email;
      this.varifyToken();
    });
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      'resetToken': [this.resetToken],
      'userEmail': [this.userEmail],
      'confirmPassword': ['', [Validators.required]],
      'newPassword': ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: this.MustMatch('newPassword', 'confirmPassword')
    });
  }

  varifyToken() {
    this._auth.validPasswordToken(this.resetToken, this.userEmail).subscribe(
      data => {
        this.currentState = 'Verified';
      },
      err => {
        this.currentState = 'Not verified';
      }
    )
  }

  validate(passwordFormGroup: FormGroup) {

    const newPassword = passwordFormGroup.controls.newPassword.value;
    const confirmPassword = passwordFormGroup.controls.confirmPassword.value;

    if (confirmPassword.length <= 0) {
      return null;
    }

    if (confirmPassword !== newPassword) {
      return {
        doesNotMatch: true
      };
    }
    return null;
  }

  countdownTimer() {
    this.interval = setInterval(() => {

      this.count = this.count - 1;
      if (this.count == 0) {
        clearInterval(this.interval);
        window.location.href = '/auth/signin';
      }


    }, 1000);
  }


  resetPassword(form) {
    if (form.valid) {

      this.isSubmitting = true;
      this.resetPasswordForm.disable();

      this.resetPasswordFormValid = true;
      this._auth.newPassword(this.resetPasswordForm.value).subscribe(
        data => {
          this.isSubmitting = false;
          this.successMsg = data.message;
          this.isSuccess = true;
          this.countdownTimer();
        },
        err => {
          switch (err.status) {

            case 0: {
              console.log(err.status)
              this.openSnackBar("Network error occured !", "close");
              break;
            }
            default: {
              this.openSnackBar(err.error.message, "close");
              break;
            }
          }

          this.resetPasswordForm.enable();
          this.isSubmitting = false;

        }
      );
    } else {
      this.resetPasswordFormValid = false;
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  public $(field) {

    return this.resetPasswordForm.get(field);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }


}

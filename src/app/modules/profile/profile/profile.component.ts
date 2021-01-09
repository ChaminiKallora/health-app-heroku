import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { SidebarComponent } from 'src/app/core/sidebar/sidebar.component';

@Component({
  providers: [SidebarComponent],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // profileForm
  isSubmitting: boolean = false;
  profileForm: FormGroup;
  date: Date;
  hide: any;

  // passwordResetForm
  isSubmitting2: boolean = false;
  passwordResetForm: FormGroup;
  resetPasswordFormValid: Boolean = false;

  constructor(
    private _auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      dob: ['', Validators.required]
    });

    this._auth.getProfile().subscribe(res => {
      this.profileForm.get('firstName').setValue(res.user.firstName);
      this.profileForm.get('lastName').setValue(res.user.lastName);
      this.date = new Date(res.user.dob)
      this.profileForm.get('dob').setValue(this.date);
    });

    this.passwordResetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  updateProfile() {
    if (!this.profileForm.valid) {
      return;
    }

    this.isSubmitting = true;
    this.profileForm.disable();

    this._auth.updateUserProfile(this.profileForm.value).subscribe(
      res => {
        this.openSnackBar("Profile updated successfully.", "close");
        this.isSubmitting = false;
        let obj = new SidebarComponent(this._auth);
        obj.callReload();
      },
      (err: HttpErrorResponse) => {

        switch (err.status) {
          case 0: this.openSnackBar("Network error occured !", "close"); break;
        }

        this.profileForm.enable();
        this.isSubmitting = false;

      }
    )
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

  updatePassword() {
    if (!this.passwordResetForm.valid) {
      return;
    }

    this.isSubmitting2 = true;
    this.passwordResetForm.disable();
    this.resetPasswordFormValid = true;

    this._auth.updatePassword(this.passwordResetForm.value).subscribe(
      res => {
        this.openSnackBar("Password updated successfully.", "close");
        this.isSubmitting2 = false;
        window.location.reload();
      },
      (err: HttpErrorResponse) => {

        switch (err.status) {
          case 0: this.openSnackBar("Network error occured !", "close"); break;
        }

        this.passwordResetForm.enable();
        this.isSubmitting2 = false;

      }
    )
  }

  get firstName() {
    return this.profileForm.get("firstName");
  }

  get lastName() {
    return this.profileForm.get("lastName");
  }

  get dob() {
    return this.profileForm.get("dob");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }

}

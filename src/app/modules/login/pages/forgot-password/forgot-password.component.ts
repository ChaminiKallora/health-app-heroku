import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userData = {}
  forgotPasswordForm: FormGroup;
  forbiddenEmails: any;
  errorMsg: String;
  successMsg: String;
  validForm: boolean;

  count = 5;
  interval;

  isSubmitting: boolean;
  isSuccess: boolean;

  constructor(
    private _auth: AuthenticationService, 
    private _router: Router,
    private _location: Location,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  goBack() {
    this._location.back();
  }



 countdownTimer() {
    this.interval = setInterval( () => {
      
      this.count = this.count - 1;
      if (this.count == 0) {
        clearInterval(this.interval);
        //this._router.navigate(['/auth/signin']);
        window.location.href = '/auth/signin';
      }


    }, 1000);
}


  resetPassword(form) {
    if (form.valid) {
      this.validForm = true;
      this.errorMsg = null;

      this.isSubmitting = true;
      this.forgotPasswordForm.disable();

      this._auth.resetPassword(this.forgotPasswordForm.value).subscribe(data => {
        //this.forgotPasswordForm.reset();
        this.successMsg = "Reset password link has sent to the email successfully.";
        
        this.isSubmitting = false;
        this.isSuccess = true;

        this.countdownTimer();

        // setTimeout(() => {
        //   this.successMsg = "Time is out.";
        //   this._router.navigate(['/auth/signin']);
        // }, 5000);
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
  
  
          this.forgotPasswordForm.enable()
          this.isSubmitting = false;
  


        });
    } else {
      this.validForm = false;
    }
  }

  public $(field) {

    return this.forgotPasswordForm.get(field);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  } 
}

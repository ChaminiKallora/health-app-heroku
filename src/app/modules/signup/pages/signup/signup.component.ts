import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatHorizontalStepper } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide= true;
  hide2= true;

  isSubmitting = false;

  count = 5;
  isSuccess: boolean;
  interval;
  
  signupForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['',Validators.required],
    dob:['',Validators.required]
  });

  accountForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:['',Validators.required],
  },{
    validator: this.MustMatch('password', 'confirmPassword')
  });

  ngOnInit() {
    
  }

  constructor(
    private fb: FormBuilder, 
    private srv: AuthenticationService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _socialAuthService: AuthService
    ) {
    
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


  submit(stepper: MatHorizontalStepper) {
    if(this.signupForm.valid && this.accountForm.valid){
      this.isSubmitting = true;
      this.signupForm.disable();
      this.srv.signup({...this.signupForm.value, ...this.accountForm.value})
      .subscribe(data => {

        //this._router.navigate(['/auth/signin'])
        this.isSubmitting = false;
        this.isSuccess = true;
        this.countdownTimer();
        stepper.next();

      }, err => {
        


        switch (err.status) {
          case 0: this.openSnackBar("Network error occured !", "close"); break;
        }

        this.signupForm.enable()

        if (err.error.message == 'Invalid Email') {
          this.openSnackBar(err.error.message, "close");
        } else {
          this.openSnackBar(err.error.message, "close");
        }

        this.isSubmitting = false;




      })
      console.log(this.signupForm.value);
  
    } else {
      console.log("Invalid");
    }
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



  facebookSignup() {
    this.isSubmitting = true;
    this.signupForm.disable();
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.srv.facebookSignup(userData.authToken)
      .subscribe(data => {

        //this._router.navigate(['/auth/signin'])
        this.isSubmitting = false;
        this.isSuccess = true;
        this.countdownTimer();

      }, err => {
        this.isSubmitting = false;
        this.signupForm.enable();
        this.openSnackBar("Error: " + err.statusText + " - " + err.status, 'CLOSE' )
      })
    }).catch(
      (err) => {
        this.isSubmitting = false;
        this.signupForm.enable();
        this.openSnackBar("Error: " + err.statusText + " - " + err.status, 'CLOSE' )
      }
    )
  }

  googleSignup() {
    this.isSubmitting = true;
    this.signupForm.disable()
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      
      this.srv.googleSignup(userData.idToken)
      .subscribe(data => {

          //this._router.navigate(['/auth/signin'])
        console.log(userData)
        this.isSubmitting = false;
        this.isSuccess = true;
        this.countdownTimer();

      }, (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.signupForm.enable();
        this.openSnackBar("Error: " + err.statusText + " - " + err.status, 'CLOSE' )
      })

    }).catch(
      (err) => {
        this.isSubmitting = false;
        this.signupForm.enable();
        this.openSnackBar("Error: " + err.statusText + " - " + err.status, 'CLOSE' )
      }
    )
  }

  public $S(field) {

    return this.signupForm.get(field);

  }

  public $A(field) {

    return this.accountForm.get(field);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }


}

import { CoreModule } from './../core.module';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthenticationService,
    private _router: Router) { }

  canActivate(): boolean {
    if(this._authService.loggedIn()){
      return true
    } else{
      this._router.navigate(['auth/signin'])
      return false
    }
  }  
  
}

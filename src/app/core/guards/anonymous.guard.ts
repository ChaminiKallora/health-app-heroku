import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(private _authService: AuthenticationService,
    private _router: Router) { }

  canActivate(): boolean {
    if(this._authService.loggedIn()){
      this._router.navigate(['/'])
      return false
    } else {
      return true
    }
  }  
  
}

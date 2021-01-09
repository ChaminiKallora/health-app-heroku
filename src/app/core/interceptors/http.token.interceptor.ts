import { CoreModule } from './../core.module';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: CoreModule
})
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthenticationService)

    if (authService.loggedIn()) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
          Subject: authService.getEmail()
        }
      })

      return next.handle(tokenizedReq);

    }
    return next.handle(req);
    


  }
}

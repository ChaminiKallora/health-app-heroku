import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _srv: AuthenticationService,
    private _router: Router,
  ) { }

  ngOnInit() {

  }

  isLogged() {
    return this._srv.loggedIn()
  }

  logout() {
    this._srv.logoutUser()
    window.location.reload();
  }

}

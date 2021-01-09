import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggle_side_bar: EventEmitter<any> = new EventEmitter();

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    this._router.navigate(['./home'])
  }

  toggleSideBar() {
    this.toggle_side_bar.emit();
    setTimeout( () => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}

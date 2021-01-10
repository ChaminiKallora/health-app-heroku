import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  image: string;

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(res => {
      this.email = res.user.email
      this.firstName = res.user.firstName;
      this.lastName = res.user.lastName;
    }, err => {
      this.email = "chaminikallora@gmail.com";
      this.firstName = "Chamini";
      this.lastName = "Kallora";
    })
  }

  public callReload() {
    window.location.reload();
  }

}

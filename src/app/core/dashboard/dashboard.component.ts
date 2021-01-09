import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  open_side_bar = true;

  constructor() { }

  ngOnInit() {
  }

  toggleSideBar($event) {
    this.open_side_bar = !this.open_side_bar;
  }

}

import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser!: string;
  constructor(private alertify: AlertifyService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  loggedin(){
    this.loggedinUser = localStorage.getItem('token') as any;
    return this.loggedinUser;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success('You are log out!')
  }


}

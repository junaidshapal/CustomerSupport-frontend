import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { filter } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CustomerSupportApp';

  isAdmin:boolean = false;

  showSidebar = true;
  showNavbar = true;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() { 
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      // Check if the current route is login or register, and hide the sidebar accordingly
      if (currentRoute === '/login' || currentRoute === '/register') {
        this.showSidebar = false;
        this.showNavbar = false;
      } else {
        this.showSidebar = true;
        this.showNavbar = true;
      }
    });
  }

  
}

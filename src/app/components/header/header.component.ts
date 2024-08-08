import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageTitle: string = 'Home';

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  showProfile() {
    // Implement show profile functionality
    console.log('Show profile clicked');
  }

  logout() {
    // Implement logout functionality
    console.log('Logout clicked');
  }
}

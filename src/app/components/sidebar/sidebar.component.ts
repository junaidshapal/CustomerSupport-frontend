import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(public authService:AuthService, private router:Router){}

 logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

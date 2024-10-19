import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  constructor(public authService:AuthService, private router:Router){}


  isAdmin: boolean = false;
  ngOnInit(): void {
//Check role
   this.checkUserRole();
  }

  checkUserRole():void{
    const userRole = this.authService.getRole();
    this.isAdmin = (userRole === 'Admin');
  }
 logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

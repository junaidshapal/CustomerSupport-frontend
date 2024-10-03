import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { filter } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomerSupportApp';

  showSidebar= true;

  constructor(private router: Router, public authService: AuthService) {
   
  } 
  
}

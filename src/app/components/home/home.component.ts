import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private authService: AuthService){}
  
  
  ngOnInit(): void {
    if (this.authService.getRole() === 'Admin') {
      console.log('This user is an Admin');
    } else {
      console.log('This user is a Customer');
    }
  }

}

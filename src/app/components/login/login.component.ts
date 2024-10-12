import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showErrorMessage = false;
  errorMessage = '';
  
  loginData = { UserName: '', Password: '' };

constructor(private authService: AuthService, private router: Router) {}

login() {
  this.authService.login(this.loginData).subscribe({
    next: (response) => {
      const role = this.authService.getRole();
      if(role == 'Admin'){
        this.router.navigate(['/tickets']);
      }
      else if(role == 'Customer'){
        this.router.navigate(['/tickets']);
      }
      
    },  
    error: (err) => {
      console.log('Login failed:', err);
    },
    complete: () => {
      console.log('Login request completed.');
    }
  });
}


}

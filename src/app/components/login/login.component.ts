import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showErrorMessage = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Onsubmit method for login 
  onSubmit() {
    this.showErrorMessage = false;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      if (this.loginForm.get('username')?.invalid) {
        this.errorMessage = 'Username is required.';
      } 
      else if (this.loginForm.get('password')?.invalid) {
        this.errorMessage = 'Password is required.';
      }
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
      return;
    }

    const { username, password } = this.loginForm.value;
    if (!this.authService.login(username, password)) {
      this.errorMessage = 'Invalid username or password.';
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    }
  }
}

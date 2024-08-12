import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private userRole: 'admin' | 'user' | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (username === 'admin' && password === 'abc') {
      this.loggedIn = true;
      this.userRole = 'admin';
      localStorage.setItem('loggedInUser',JSON.stringify({username:username, password: password, role: 'admin'}));
      this.router.navigate(['/home']);
      return true;
    } 
    else if (username === 'user' && password === 'abc') {
      this.loggedIn = true;
      this.userRole = 'user';
      localStorage.setItem('loggedInUser',JSON.stringify({username:username, password: password, role: 'user'}));
      this.router.navigate(['/tickets']);
      return true;
    } 
    else {
      this.loggedIn = false;
      this.userRole = null;
      return false;
    }
  }

  logout() {
    this.loggedIn = false;
    this.userRole = null;
    localStorage.setItem('loggedInUser','');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if(loggedInUser!=undefined && loggedInUser!=null && loggedInUser!=''){
      this.loggedIn = true;
    }
    return this.loggedIn;
  }

  getUserRole(): 'admin' | 'user' | null {
    return this.userRole;
  }
}

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = false;
//   private userRole: 'admin' | 'user' | null = null;

//   constructor(private router: Router) {}

//   login(username: string, password: string) {
//     if (username === 'admin' && password === 'abc') {
//       this.loggedIn = true;
//       this.userRole = 'admin';
//       localStorage.setItem('loggedInUser',JSON.stringify({username:username, password: password, role: 'admin'}));
//       this.router.navigate(['/home']);
//       return true;
//     } 
//     else if (username === 'user' && password === 'abc') {
//       this.loggedIn = true;
//       this.userRole = 'user';
//       localStorage.setItem('loggedInUser',JSON.stringify({username:username, password: password, role: 'user'}));
//       this.router.navigate(['/tickets']);
//       return true;
//     } 
//     else {
//       this.loggedIn = false;
//       this.userRole = null;
//       return false;
//     }
//   }

//   logout() {
//     this.loggedIn = false;
//     this.userRole = null;
//     localStorage.setItem('loggedInUser','');
//     this.router.navigate(['/login']);
//   }

//   isLoggedIn(): boolean {
//     let loggedInUser = localStorage.getItem('loggedInUser');
//     if(loggedInUser!=undefined && loggedInUser!=null && loggedInUser!=''){
//       this.loggedIn = true;
//     }
//     return this.loggedIn;
//   }

//   getUserRole(): 'admin' | 'user' | null {
//     return this.userRole;
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7077/api/Auth';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  // Register User
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        console.log('Login successful', response);
        if (response.token) {
          localStorage.setItem('jwtToken', response.token);
        }
        return response;
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(err);
      })
    );
  }

  //Role based Auth
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    }
    return null;
  }
  

  //Specific role
  hasRole(role: string):boolean{
    const userRole = this.getRole();
    return userRole === role; 
  }

   // Logout User
   logout(): void {
    localStorage.removeItem('jwtToken');
  }
  
  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('jwtToken');
  // }

  // isAuthenticated(): boolean {
  //   const token = this.getToken();
  //   return !!token && !this.jwtHelper.isTokenExpired(token);
  // }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      console.log('Token is either missing or expired.');
      return false;
    }
    return true;
  }
  
  
  // Get token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}

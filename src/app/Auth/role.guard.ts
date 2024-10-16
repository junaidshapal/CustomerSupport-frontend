import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getRole();

    //const isAuthenticated = this.authService.isAuthenticated();

    console.log('Expected Role:', expectedRole);   
    console.log('User Role:', userRole);           
    console.log('Is Authenticated:', this.authService.isAuthenticated()); 

    if(!this.authService.isAuthenticated() || userRole != expectedRole){
      console.log(`Role mismatched expected: ${expectedRole} but got: ${userRole}`);
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://localhost:7077/api/Admin';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getAllUSers():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/get-all-users`)
  }
  approveUser(userId: string):Observable<any>{
    return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {});
  }
  blockUser(userId:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/block-user/${userId}`, {});
  }
}

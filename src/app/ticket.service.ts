import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from './Model/Ticket';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './Model/User';
import { TicketComment } from './Model/TicketComment';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  getCommentsByTicketId(ticketId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private authService: AuthService) {}

  private apiUrl = 'https://localhost:7077/api/Tickets';
  //private usersUrl = 'https://localhost:7077/api/Users';
  private commentsUrl = 'https://localhost:7077/api/TicketComments';

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }


  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket).pipe(
      catchError((error) => {
        console.log('Error creating ticket:', error);
        if (error.status === 401) {
          console.log('Token expired or unauthorized. Logging out.');
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
  

  createTicket(ticket: Ticket): Observable<Ticket> {
    const token = this.authService.getToken(); // Fetch token using AuthService
    if (!token) {
      console.error('No token found! Redirecting to login...');
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Add token to the request headers
    });

    return this.http.post<Ticket>(this.apiUrl, ticket, { headers }).pipe(
      catchError((error) => {
        console.log('Error creating ticket:', error);
        if (error.status === 401) {
          console.log('Unauthorized. Logging out.');
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }

  updateTicket(id: number, ticket: Ticket): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ticket);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //SerarchTickets by name
  searchTickets(name: string):Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.apiUrl}/Search?name = ${name}`);
  }

  //Get users
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl);
  // }

  //Get comments by ticket ID
  // getCommentsByTicketId(ticketId: number): Observable<TicketComment[]> {
  //   return this.http.get<TicketComment[]>(
  //     `${this.commentsUrl}/ticket/${ticketId}`
  //   );
  // }

  //Add Comments
  addComment(comment: TicketComment): Observable<TicketComment> {
    return this.http.post<TicketComment>(this.commentsUrl, comment);
  }

  //Edit comment
  updateComment(id: number, comment: TicketComment): Observable<void> {
    return this.http.put<void>(`${this.commentsUrl}/${id}`, comment);
  }
  

  //Delete Comment
  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.commentsUrl}/${commentId}`);
  }


  
}

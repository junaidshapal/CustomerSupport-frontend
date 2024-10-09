import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from './Model/Ticket';
import { Observable } from 'rxjs';
import { User } from './Model/User';
import { TicketComment } from './Model/TicketComment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  getCommentsByTicketId(ticketId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://localhost:7077/api/Tickets';
  //private usersUrl = 'https://localhost:7077/api/Users';
  private commentsUrl = 'https://localhost:7077/api/TicketComments';

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  //Get Role based tickets for customer
  // getCustomerTickets():Observable<Ticket>{

  // }

  //Create new ticket
  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
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

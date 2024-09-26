import { Component, OnInit } from '@angular/core';
import { Ticket } from '../Model/Ticket';
import { TicketService } from '../ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit {
  tickets: Ticket[] = [];
  showErrorMessage = false;
  successMessage = '';

  //for search ticket 
  searchTerm:string = '';
  filteredTickets:Ticket[] = [];

  constructor(private router: Router, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  viewDetails(ticketId: number):void{
    this.router.navigate(['/ticket-details', ticketId]);
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        this.filteredTickets = data;
      },
      error: (error) => {
        console.log('Error loading tickets', error);
      }
    });
  }

  //Search tickets method
  searchTickets():void{
    if(this.searchTerm.trim()){
      debugger
      this.filteredTickets = this.tickets.filter(ticket => 
        ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    else{
      console.log("error");
      this.filteredTickets = [...this.tickets];
    }
  }

  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe({
      next: () => {
        this.loadTickets();
        this.showErrorMessage = true;
        this.successMessage = 'Ticket deleted successfully';
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      },
      error: (error) => {
        console.log('Error deleting ticket', error);
      }
    });
  }
}

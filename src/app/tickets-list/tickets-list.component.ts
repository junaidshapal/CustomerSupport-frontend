import { Component, OnInit, TemplateRef } from '@angular/core';
import { Ticket } from '../Model/Ticket';
import { TicketService } from '../ticket.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit {
  tickets: Ticket[] = [];
  showErrorMessage = false;
  successMessage = '';

  //selected tickets
  selectedTicket?: Ticket;

  //for search ticket 
  searchTerm:string = '';
  filteredTickets:Ticket[] = [];

  constructor(private router: Router, private modalService: NgbModal, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  //Modal for ticketDetails
  openDetailsModal(content: TemplateRef<any>, ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.modalService.open(content, { ariaLabelledBy: 'ticketDetailsModalLabel' });
  }

  // viewDetails(ticketId: number):void{
  //   this.router.navigate(['/ticket-details', ticketId]);
  // }

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

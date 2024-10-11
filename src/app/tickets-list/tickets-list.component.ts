import { Component, OnInit, TemplateRef } from '@angular/core';
import { Ticket } from '../Model/Ticket';
import { TicketService } from '../ticket.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../Services/auth.service';
import { error } from 'node:console';


@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit {
  tickets: Ticket[] = [];
  showErrorMessage = false;
  successMessage = '';


  //show entries waly variables
  paginatedTickets: Ticket[] = [];
  entriesToShow = 5;
  entriesOptions = [5, 10, 15, 20];
  currentPage = 1;
  totalPages = 1;

  //selected tickets
  selectedTicket?: Ticket;

  //for search ticket 
  searchTerm:string = '';
  filteredTickets:Ticket[] = [];

  //Roles
  isAdmin: boolean = false;
  isCustomer: boolean = false;
  
  //var message for tickets to show
  message = '';

  constructor(private router: Router, 
    private modalService: NgbModal,
    private ticketService: TicketService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.isAdmin =  this.authService.getRole() === "Admin";
    this.isCustomer =  this.authService.getRole() === "Customer";
    this.loadTickets();
  }

  loadTickets(): void {
    console.log('Loading tickets for', this.isAdmin ? 'Admin' : 'Customer');

    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        this.filteredTickets = data;
        this.updatePagination();

        if (this.isCustomer && this.tickets.length === 0) {
          this.message = 'No tickets created';
        }
      },
      error: (error) => {
        console.log('Error loading tickets', error);
      }
    });
  }

  // loadTickets(): void {
  //   if(this.isAdmin){
  //     console.log('Load Tickets for admin');
  //     this.ticketService.getTickets().subscribe({
  //       next: (data) => {
  //         this.tickets = data;
  //         this.filteredTickets = data;
  //         this.updatePagination();
  //       },
  //       error: (error) => {
  //         console.log('Error loading tickets for admin', error);
  //       }
  //     });
  //   }
  //   else if(this.isCustomer){
  //     console.log('Load Tickets for customer');
  //     this.ticketService.getCustomerTickets().subscribe({
  //       next:(data) =>{
  //         this.tickets = data;
  //         this.filteredTickets = data;
  //         this.updatePagination();

  //         if(this.tickets.length === 0){
  //           this.message = 'No tickets created';
  //         }
  //       },

  //       error: (error)=>{
  //         console.log("Error loading tickets for customer",error);
  //       }
  //     });
  //   } 
  // }

  // Update the paginated tickets based on the selected number of entries and current page

  updatePagination(): void{
    console.log("Update pagination");
    this.totalPages = Math.ceil(this.tickets.length / this.entriesToShow);
    const startIndex = (this.currentPage - 1) * this.entriesToShow;
    const endIndex = startIndex + this.entriesToShow;

    this.paginatedTickets = this.tickets.slice(startIndex, endIndex);
  }

  //Method called hota hai jab user number of entries change krta hai
  onEntriesChange(event: any):void{
    this.currentPage = 1; //Reset to first page
    this.updatePagination();
  }

  //Handle pagination control
  previousPage():void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage():void{
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.updatePagination();
    }
  }


  //Modal for ticketDetails
  openDetailsModal(content: TemplateRef<any>, ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.modalService.open(content, { ariaLabelledBy: 'ticketDetailsModalLabel' });
  }

  

  //Search tickets method
  // searchTickets():void{
  //   if(this.searchTerm.trim()){
  //     debugger
  //     this.filteredTickets = this.tickets.filter(ticket => 
  //       ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  //   else{
  //     this.updatePagination();
  //     console.log("error");
  //     this.filteredTickets = [...this.tickets];
  //   }
  // }
  searchTickets(): void {
    if (this.searchTerm) {
      this.paginatedTickets = this.tickets.filter(ticket =>
        ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      console.log("Invalid search term");
      this.updatePagination();
    }
  }


  //Delete Ticket
  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe({
      next: () => {
        this.loadTickets();
        this.showErrorMessage = true;
        this.successMessage = 'Ticket deleted successfully';
        this.updatePagination();
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

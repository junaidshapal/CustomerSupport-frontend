import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent implements OnInit {

  ticket: any;
  constructor(private route: ActivatedRoute, private ticketService:TicketService, private router: Router){}


  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.getTicketDetails(Number(id));
    }
  }

  getTicketDetails(ticketId: number): void {
    this.ticketService.getTicket(ticketId).subscribe((ticket) => {
      this.ticket = ticket;
    });
  }
  

  goBack(): void {
    this.router.navigate(['/tickets']);
  }
  

}

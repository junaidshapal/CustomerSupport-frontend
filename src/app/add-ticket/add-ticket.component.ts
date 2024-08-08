import { Component, OnInit } from '@angular/core';
import { Ticket } from '../Model/Ticket';
import { TicketService } from '../ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Model/User';
import { error } from 'console';
import { TicketComment } from '../Model/TicketComment';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  //Ticket Properties from API
  ticket: Ticket = {
    id: 0,
    title: '',
    description: '',
    createdDate: new Date(),
    createdBy: 'User',
    status: 0,
    assignedTo:''
  };

  //Add Comment properties from API
  newComment: TicketComment = {
    id: 0,
    ticketId: 0,
    commentMessage: '',
    createdBy: 'User',
    createdOn: new Date(),
    modifiedBy: '',
    modifiedOn: new Date()
  };

  //Array of Users
  users:User[] = [];
  comments: TicketComment[] = [];
  
  //For ticket
  showSuccessMessage = false;
  successMessage = '';
  //For comment required
  showError = false;
  error = '';
  //For add comment
  commentMessage = '';
  showCommentMessage = false;
  

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTicket(Number(id));
      //this.loadComments(Number(id));
    }
    this.loadUsers();
  }

  //Method to mload Tickets
  loadTicket(id: number): void {
    this.ticketService.getTicket(id).subscribe({
      next: (data) => {
        this.ticket = data;
      },
      error: (error) => {
        console.log('Error loading ticket', error);
      }
    });
  }


  //Method to load Users
  loadUsers(): void {
    this.ticketService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.log('Error loading ticket', error);
      }
    });
  }

  //Method to load Commments
  loadComments(ticketId: number): void {
    this.ticketService.getCommentsByTicketId(ticketId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (error) => {
        console.log('Error loading ticket', error);
      }
    });
  }

  //Method for save ticket in DB
  saveTicket(): void {
    this.showSuccessMessage = false;
    this.successMessage = '';

    if (!this.ticket.title && !this.ticket.description) {
      this.successMessage = 'Title and description are required!';
      this.showSuccessMessage = true;
    } 
    else if (!this.ticket.title) {
      this.successMessage = 'Title is required.';
      this.showSuccessMessage = true;
    } 
    else if (!this.ticket.description) {
      this.successMessage = 'Description is required.';
      this.showSuccessMessage = true;
    }
    else if (!this.ticket.assignedTo) {
      this.successMessage = 'Assigned to is required.';
      this.showSuccessMessage = true;
    }

    if (this.showSuccessMessage) {
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
      return;
    }

    if (this.ticket.id) {
      this.ticketService.updateTicket(this.ticket.id, this.ticket).subscribe({
        next: () =>{
          this.router.navigate(['/tickets'])
        },
        error: (error) => console.log('Error updating ticket', error)
      });
    } 
    else {
      this.ticketService.createTicket(this.ticket).subscribe({
        next: () =>{
          this.router.navigate(['/tickets'])
        },
        error: (error) => console.log('Error creating ticket', error)
      });
    }
  }

  //Method for Add comment
  addComment(): void {

    this.showError = false;
    this.error = '';

    if(!this.newComment.commentMessage.trim()){
      this.error = 'Please enter a valid Message';
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3000);
      return;
    }

    this.newComment.ticketId = this.ticket.id;
    this.newComment.createdOn = new Date();
    this.ticketService.addComment(this.newComment).subscribe({
      next: (data) => {
        this.comments.push(data);
        this.newComment.commentMessage = '';  
        this.showCommentMessage = true;
        this.commentMessage = 'Comment added successfully';
        console.log('success')
        setTimeout(() => {
          this.showCommentMessage = false;
        }, 3000);
      },
      error: (error) => {
        console.log('Error adding comment', error);
      }
    });
  }

  //By clicking on cancel button navigate to tickets component
  cancel(): void {
    this.router.navigate(['/tickets']);
  }
}

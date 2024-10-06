import { Component, OnInit } from '@angular/core';
import { Ticket } from '../Model/Ticket';
import { TicketService } from '../ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Model/User';
import { Console, error } from 'console';
import { TicketComment } from '../Model/TicketComment';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})
export class AddTicketComponent implements OnInit {
  //Ticket Properties from API
  ticket: Ticket = {
    id: 0,
    title: '',
    description: '',
    createdDate: new Date(),
    createdBy: 'User',
    status:1,
    assignedTo: '',
  };



  //Add Comment properties from API
  newComment: TicketComment = {
    id: 0,
    ticketId: 0,
    commentMessage: '',
    createdBy: 'User',
    createdOn: new Date(),
    modifiedBy: '',
    modifiedOn: new Date(),
  };

  //Array of Users
  //users: User[] = [];
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

  //For edited Comment message
  editedCommentMessage = '';
  showEditCommentMessage = false;       
  isEditingComment: boolean = false;

  
  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.loadTicket(Number(id));
      //this.loadComments(Number(id));
    }
   // this.loadUsers();
  }

    
  //Method to load Tickets
  loadTicket(id: number): void {
    if(id && id > 0){
      this.ticketService.getTicket(id).subscribe({
        next: (data) => {
          this.ticket = data;
          this.newComment.ticketId = this.ticket.id;
        },
        error: (error) => {
          console.log('Error loading ticket', error);
        },
      });
    }
    else{
      console.log('Invalid');
    }
    
  }

  //Method to load Users
  // loadUsers(): void {
  //   this.ticketService.getUsers().subscribe({
  //     next: (data) => {
  //       this.users = data;
  //     },
  //     error: (error) => {
  //       console.log('Error loading ticket', error);
  //     },
  //   });
  // }

  //Method to load Commments
  // loadComments(ticketId: number): void {
  //   this.ticketService.getCommentsByTicketId(ticketId).subscribe({
  //     next: (data) => {
  //       this.comments = data;
  //       this.ticket.comments = this.comments;
  //     },
  //     error: (error) => {
  //       console.log('Error loading ticket', error);
  //     },
  //   });
  // }

  //Method for save ticket in DB
  saveTicket(): void {
    this.showSuccessMessage = false;
    this.successMessage = '';

    if (!this.ticket.title && !this.ticket.description) {
      this.successMessage = 'Title and description are required!';
      this.showSuccessMessage = true;
    } else if (!this.ticket.title) {
      this.successMessage = 'Title is required.';
      this.showSuccessMessage = true;
    } else if (!this.ticket.description) {
      this.successMessage = 'Description is required.';
      this.showSuccessMessage = true;
    } //else if (!this.ticket.assignedTo) {
    //   this.successMessage = 'Assigned to is required.';
    //   this.showSuccessMessage = true;
    // }

    if (this.showSuccessMessage) {
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
      return;
    }

    if (this.ticket.id) {
      this.ticketService.updateTicket(this.ticket.id, this.ticket).subscribe({
        next: () => {
          console.log("y")
          this.router.navigate(['/tickets']);
        },
        error: (error) => 
          console.log('Error updating ticket', error), 
      });
    } else {
        this.ticketService.createTicket(this.ticket).subscribe({
        next: () => {
          this.router.navigate(['/tickets']);
        },
        error: (error) => 
          console.log('Error creating ticket', error),
      });
    }
  }

  
  //AddorEdit Comment
  addOrUpdateComment(): void {
    this.showError = false;
    this.error = '';
    if (!this.newComment.commentMessage.trim()) {
      this.error = 'Please enter a valid message';
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
      return;
    }

    if (this.isEditingComment) {
      this.updateComment();
    } else {
      this.addComment();
    }
  }

  addComment(): void {
    this.newComment.ticketId = this.ticket.id;
    this.newComment.createdOn = new Date();

    this.ticketService.addComment(this.newComment).subscribe({
      next: (data) => {
        this.comments.push(data);
        this.resetCommentForm();
        this.showCommentMessage = true;
        this.commentMessage = 'Comment added successfully';
        setTimeout(() => {
          this.showCommentMessage = false;
        }, 3000);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error adding comment', error);
      },
    });
  }

  editComment(comment: TicketComment): void {
    this.newComment = { ...comment };
    this.isEditingComment = true;
  }

  updateComment(): void {
    this.ticketService.updateComment(this.newComment.id, this.newComment).subscribe({
      next: () => {
        //Find the index of the comment in the comments array
        const index = this.comments.findIndex(c => c.id === this.newComment.id);
        if (index !== -1) {
          //Update the comment in the array
          this.comments[index] = { ...this.newComment };
          this.comments = [...this.comments];
        }
        
        //Reset the form
        this.resetCommentForm();
        this.isEditingComment = false;
  
        //Show success message
        this.showEditCommentMessage = true;
        this.editedCommentMessage = 'Comment updated successfully';
        setTimeout(() => {
          this.showEditCommentMessage = false;
        }, 3000);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error updating comment', error);
      }
    });
  }
  


  //deleteComment method
  deleteComment(commentId: number): void {
    this.ticketService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
        this.showCommentMessage = true;
        this.commentMessage = 'Comment deleted successfully';
        setTimeout(() => {
          this.showCommentMessage = false;
        }, 3000);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error deleting comment', error);
      }
    });
  }

  //By clicking on cancel button navigate to tickets component
  cancel(): void {
    this.router.navigate(['/tickets']);
  }

  //Reset comment form after adding or updateing comment
  resetCommentForm(): void {
    this.newComment = {
      id: 0,
      ticketId: this.ticket.id,
      commentMessage: '',
      createdBy: '',
      createdOn: new Date(),
      modifiedBy: '',
      modifiedOn: new Date()
    };
    this.isEditingComment = false; 
  }
}

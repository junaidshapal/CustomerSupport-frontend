import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  users:any [] = [];
  
  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    //this.loadUsers();
  }


  // loadUsers():void{
  //   this.adminService.getAllUSers().subscribe({
  //     next:(data) => {
  //       console.log('Fetched users:', data);
  //       this.users = data;
  //     },
  //     error:(err) =>{
  //       console.log("error loading users", err);
  //     }
  //   });
  // }


  // approveUser(userId: string){
  //   this.adminService.approveUser(userId).subscribe({
  //     next:() => {
  //       console.log('Approved user');
  //       this.loadUsers(); //Load users after approve
  //     },
  //     error:(err) =>{
  //       console.log("Error approving user", err);
  //     }
  //   });
  // }

  // blockUser(userId: string){
  //   this.adminService.blockUser(userId).subscribe({
  //     next:() => {
  //         this.loadUsers();
  //     },
  //     error:(err) =>{
  //       console.log("Error blocking user", err);
  //     }
  //   })
  // }
}

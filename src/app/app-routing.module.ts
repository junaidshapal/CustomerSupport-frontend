import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { AddTicketComponent  } from './add-ticket/add-ticket.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { RoleGuard } from './Auth/role.guard';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';


// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'admin-tickets', component: TicketsListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'Admin' }},
//    // Route for customers to view only their own tickets
//    { path: 'customer-tickets', component: TicketsListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'Customer' }},
//   { path: 'tickets/:id', component: AddTicketComponent, canActivate: [AuthGuard] },
//   { path: 'tickets/ticket-details/:id', component: TicketDetailsComponent, canActivate: [AuthGuard] },
//   { path: '**', redirectTo: 'login' }
// ];

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // Single route for both Admin and Customer
  { path: 'tickets', component: TicketsListComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'Admin' }},
  { path: 'tickets/:id', component: AddTicketComponent, canActivate: [AuthGuard] },
  { path: 'tickets/ticket-details/:id', component: TicketDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

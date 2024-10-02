import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { AddTicketComponent  } from './add-ticket/add-ticket.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: TicketsListComponent, canActivate: [AuthGuard] },
  { path: 'tickets/:id', component: AddTicketComponent , canActivate: [AuthGuard] },
  { path: 'tickets/ticket-details/:id', component: TicketDetailsComponent }, // For ticket details
  //{ path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

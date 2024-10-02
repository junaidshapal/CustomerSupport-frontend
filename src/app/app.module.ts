import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { AddTicketComponent  } from './add-ticket/add-ticket.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClient } from '@angular/common/http';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './Auth/token.interceptor';


export function tokenGetter(){
  return localStorage.getItem('jwtToken');
}

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    TicketsListComponent,
    HomeComponent,
    AddTicketComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes:['localhost:5000/api/auth/login', 'localhost:5000/api/auth/register']
      }
    })
  ],
  providers: [
   // provideClientHydration()
   //JwtHelperService
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

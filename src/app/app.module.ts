import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatDatepickerModule,MatNativeDateModule } from '@angular/material';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginService} from './login.service';
import {WebsocketService} from './websocket.service'
import { CustomerDashBoardComponent } from './customer-dash-board/customer-dash-board.component';
import { LogComplaintsComponent } from './log-complaints/log-complaints.component';
import { AgmCoreModule } from '@agm/core';
import { ViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { StaffDashBoardComponent } from './staff-dash-board/staff-dash-board.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EditCustomerDetailsComponent } from './edit-customer-details/edit-customer-details.component';
import { StaffViewAllocatedComplaintsComponent } from './staff-view-allocated-complaints/staff-view-allocated-complaints.component';
import { StaffEditDetailsComponent } from './staff-edit-details/staff-edit-details.component';
import { StaffCreateJobTicketComponent } from './staff-create-job-ticket/staff-create-job-ticket.component';
import { StaffManuallyAllocateComplaintsComponent } from './staff-manually-allocate-complaints/staff-manually-allocate-complaints.component';

//new
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CustomerDashBoardComponent,
    LogComplaintsComponent,
    ViewComplaintsComponent,
    StaffDashBoardComponent,
    HeaderComponent,
    FooterComponent,
    EditCustomerDetailsComponent,
    StaffViewAllocatedComplaintsComponent,
    StaffEditDetailsComponent,
    StaffCreateJobTicketComponent,
    StaffManuallyAllocateComplaintsComponent,
    



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,//new
    FormsModule,
    AgmCoreModule.forRoot({//new
      apiKey: 'AIzaSyCZVQiQ5HOprGADSF1kFH5GiOjlXDILuKo'
    })
    //before apiKey: 'AIzaSyArJu7m6povP8xlqd5vVfX7Qz9UaSzm4OQ'
  ],
  exports: [
    HeaderComponent,
    FooterComponent,


  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

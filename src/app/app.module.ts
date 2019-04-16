import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

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
    StaffViewAllocatedComplaintsComponent    
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyArJu7m6povP8xlqd5vVfX7Qz9UaSzm4OQ'
    })
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

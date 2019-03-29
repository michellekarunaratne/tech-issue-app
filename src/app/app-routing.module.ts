import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CustomerDashBoardComponent} from './customer-dash-board/customer-dash-board.component';
import { LogComplaintsComponent} from './log-complaints/log-complaints.component';
import { ViewComplaintsComponent} from './view-complaints/view-complaints.component';
import { StaffDashBoardComponent} from './staff-dash-board/staff-dash-board.component';
import { EditCustomerDetailsComponent} from './edit-customer-details/edit-customer-details.component';


const routes:Routes=[
  {path:'registration', component:RegistrationComponent},
  {path:'',component:LoginComponent,pathMatch: 'full'},
  {path:'customerDash',component:CustomerDashBoardComponent},
  {path:'customerDash/logComplaints',component:LogComplaintsComponent},
  {path:'customerDash/viewComplaints',component:ViewComplaintsComponent},
  {path:'staffDash',component:StaffDashBoardComponent},
  {path:'login',component:LoginComponent},
  {path:'customerDash/editDetails',component:EditCustomerDetailsComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) 
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

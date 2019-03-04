import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CustomerDashBoardComponent} from './customer-dash-board/customer-dash-board.component';


const routes:Routes=[
  {path:'registration', component:RegistrationComponent},
  {path:'',component:LoginComponent,pathMatch: 'full'},
  {path:'customerDash',component:CustomerDashBoardComponent},
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

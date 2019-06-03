import { Component, OnInit } from '@angular/core';
import { StoreStatusService} from '../store-status.service';
import { Router,  ActivatedRoute,RoutesRecognized  } from '@angular/router';
import { Location } from '@angular/common';
import { StaffServiceService } from '../staff-service.service';
import { filter, pairwise } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
 
})
export class HeaderComponent implements OnInit {

  previousUrl
  public href: string = "";
  constructor(
    public storeStatusService:StoreStatusService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public staffService:StaffServiceService
  ) {}

  ngOnInit() {
  }

  logout()
  {
    this.href = this.router.url;
    if(this.href.includes('staff'))
    {
     this.staffService.logoutActiveStaffMembers(localStorage.getItem('empId'))
     .subscribe(user=>{
       
        localStorage.removeItem('empId');
        localStorage.removeItem('staff.firstName')
        localStorage.removeItem('staff.lastName')
        localStorage.removeItem('staff.email')
        localStorage.removeItem('staff.phone')
     }) 
    }
    else
    {
      localStorage.removeItem('customer.firstName')
      localStorage.removeItem('customer.lastName')
      localStorage.removeItem('customer.email')
      localStorage.removeItem('customer.phone')
      localStorage.removeItem('userId')
    }
    this.storeStatusService.setLogoutStatus()
    this.router.navigate(['/login'])
  }

  directHome()
  {
    this.location.back()
  }

}

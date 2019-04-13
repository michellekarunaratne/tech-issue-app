import { Component, OnInit } from '@angular/core';
import { StoreStatusService} from '../store-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public storeStatusService:StoreStatusService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout()
  {
    this.storeStatusService.setLogoutStatus()
    this.router.navigate(['/login'])
  }

  directHome()
  {
    this.router.navigate(['/customerDash'])
  }

}

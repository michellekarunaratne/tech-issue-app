import { Component, OnInit } from '@angular/core';
import { StoreStatusService} from '../store-status.service';
import { Router,  ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  previousUrl
  constructor(
    public storeStatusService:StoreStatusService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
  }

  logout()
  {
    localStorage.clear();
    this.storeStatusService.setLogoutStatus()
    this.router.navigate(['/login'])
  }

  directHome()
  {
    this.location.back()
  }

}

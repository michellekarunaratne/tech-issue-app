import { Component, OnInit } from '@angular/core';
import { StoreStatusService} from '../store-status.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    public storeStatusService:StoreStatusService,
  ) { }

  ngOnInit() {

    this.storeStatusService.setLoginStatus()
  }

}

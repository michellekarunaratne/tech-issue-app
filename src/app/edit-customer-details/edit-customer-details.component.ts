import { Component, OnInit } from '@angular/core';
import { StoreStatusService} from '../store-status.service';

@Component({
  selector: 'app-edit-customer-details',
  templateUrl: './edit-customer-details.component.html',
  styleUrls: ['./edit-customer-details.component.scss']
})
export class EditCustomerDetailsComponent implements OnInit {
  

  constructor(
    public storeStatusService:StoreStatusService
  ) { }

  ngOnInit() {
    this.storeStatusService.setLoginStatus()
  }

}

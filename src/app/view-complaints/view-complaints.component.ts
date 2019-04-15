import { Component, OnInit } from '@angular/core';
import {CustomerServiceService} from '../customer-service.service'
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';
import { element } from '@angular/core/src/render3';
import Complaint from '../complaint';

@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.scss']
})
export class ViewComplaintsComponent implements OnInit {

  elements: Complaint[];

  headElements = ['Equipment Name', 'Equipment Fault','Date','Technician Allocated','Image'];


  constructor(
    private customerService:CustomerServiceService,
    private storeStatusService:StoreStatusService,
  ) { }

  ngOnInit() {
    this.storeStatusService.setLoginStatus()
    this.customerService.viewCustomerComplaints(localStorage.getItem('userId'))
    .subscribe(complaints=>{
      this.elements=complaints
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {CustomerServiceService} from '../customer-service.service'
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';
import { element } from '@angular/core/src/render3';
import Complaint from '../complaint';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.scss']
})
export class ViewComplaintsComponent implements OnInit {

  index;
  elements: Complaint[];
  imagePath


  headElements = ['Complaint Number','Equipment Name', 'Equipment Fault','Date','Technician Allocated','Image'];


  constructor(
    private customerService:CustomerServiceService,
    private storeStatusService:StoreStatusService,
    private _sanitizer: DomSanitizer
  ) { }

  setImageSrc(event)
  {
    var target=event.target || event.srcElement || event.currentTarget
    var elementIndex=target.attributes.id.value;
    var image = this.elements[elementIndex].image
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:'+image.filename+';base64,'+image.filevalue);

  }

  ngOnInit() {
    this.index=0;
    this.storeStatusService.setLoginStatus()
    this.customerService.viewCustomerComplaints(localStorage.getItem('userId'))
    .subscribe(complaints=>{
      this.elements=complaints
    })
  }

}

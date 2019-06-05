import { Component, OnInit } from '@angular/core';
import {CustomerServiceService} from '../customer-service.service'
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';
import { element } from '@angular/core/src/render3';
import Complaint from '../complaint';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.scss']
})
export class ViewComplaintsComponent implements OnInit {

  index;
  elements: Complaint[];
  imagePath

  date= new FormControl('');
  startTime= new FormControl('');
  endTime= new FormControl('');
  cost = new FormControl('');
  jobTicket = new FormControl('');

  lat:number;
  lng:number;

  headElements = ['Complaint Number','Refference Number','Equipment Name', 'Equipment Fault','Date','Technician Allocated','Image','Complain Location','View Report'];


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

  setLocation(event)
  {
    var target=event.target || event.srcElement || event.currentTarget
    var elementIndex=target.attributes.id.value;
    this.lat = parseFloat(this.elements[elementIndex].location.latitude.toString());
    this.lng = parseFloat(this.elements[elementIndex].location.longitude.toString());
    console.log(this.lat);
    console.log(this.lng);
  }

  ngOnInit() {
    this.index=0;
    this.storeStatusService.setLoginStatus()
    this.customerService.viewCustomerComplaints(localStorage.getItem('userId'))
    .subscribe(complaints=>{
      this.elements=complaints
    })
  }

  viewReport(event)
  {
    var target=event.target || event.srcElement || event.currentTarget
    var selectedElementIndex=target.attributes.id.value;
    var report=this.elements[selectedElementIndex].report
    this.date.setValue(report.date)
    this.startTime.setValue(report.startTime)
    this.endTime.setValue(report.endTime)
    this.cost.setValue(report.cost)
    this.jobTicket.setValue(report.jobTicket)

  }


}

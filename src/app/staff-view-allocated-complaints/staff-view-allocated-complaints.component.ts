import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../staff-service.service';
import { element } from '@angular/core/src/render3';
import { DomSanitizer } from '@angular/platform-browser';
import { StoreStatusService} from '../store-status.service';
import {WebsocketService} from '../websocket.service';

@Component({
  selector: 'app-staff-view-allocated-complaints',
  templateUrl: './staff-view-allocated-complaints.component.html',
  styleUrls: ['./staff-view-allocated-complaints.component.scss']
})
export class StaffViewAllocatedComplaintsComponent implements OnInit {

  index=0
  imagePath
  constructor(
    public staffService:StaffServiceService,
    private _sanitizer: DomSanitizer,
    private storeStatusService:StoreStatusService,
    private webSocketService:WebsocketService
  ) { }

  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['Complaint Number','Customer Name', 'Equipment Name', 'Equipment Fault', 'Phone','Date','Image'];

  ngOnInit() {

    this.index=0;

    this.storeStatusService.setLoginStatus()

    this.staffService.getAllocatedComplaints(localStorage.getItem('empId'))
    .subscribe(complaints=>{
      this.elements=complaints
      console.log(this.elements)
    })
    
    this.webSocketService.getNotification()
    .subscribe((msg:String)=>{
      alert(msg)
    })
   
  }

  setImageSrc(event)
  {
    var target=event.target || event.srcElement || event.currentTarget
    var elementIndex=target.attributes.id.value;
    var image = this.elements[elementIndex].image
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:'+image.filename+';base64,'+image.filevalue);
  }

}

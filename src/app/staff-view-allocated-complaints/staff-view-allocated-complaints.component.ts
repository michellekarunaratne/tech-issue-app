import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../staff-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StoreStatusService} from '../store-status.service';
import {WebsocketService} from '../websocket.service';
import { FormControl, Validators } from '@angular/forms';
import 'hammerjs';
import Complaint from '../complaint';



@Component({
  selector: 'app-staff-view-allocated-complaints',
  templateUrl: './staff-view-allocated-complaints.component.html',
  styleUrls: ['./staff-view-allocated-complaints.component.scss']
})
export class StaffViewAllocatedComplaintsComponent implements OnInit {

  index=0;
  selectedElementIndex;
  imagePath;
  elements;
  complaintList;
 
  
  headElements = ['Complaint Number','Refference Number','Customer Name', 'Equipment Name', 'Equipment Fault', 'Phone','Date','Image','Add Report'];
  constructor(
    public staffService:StaffServiceService,
    private _sanitizer: DomSanitizer,
    private storeStatusService:StoreStatusService,
    private webSocketService:WebsocketService
  ) { }


  date= new FormControl('');
  startTime= new FormControl('');
  endTime= new FormControl('');
  cost = new FormControl('');
  jobTicket = new FormControl('');
  refferenceNumber=new FormControl('',Validators.required);
  

  ngOnInit() {

    this.index=0;

    this.storeStatusService.setLoginStatus()

    this.staffService.getAllocatedComplaints(localStorage.getItem('empId'))
    .subscribe(complaints=>{
      this.complaintList=complaints
      this.elements=complaints
    })
    
    this.webSocketService.getNotification()
    .subscribe((msg:String)=>{
      alert(msg)
    })

    this.webSocketService.logActiveStaffUser(localStorage.getItem('empId'))

  }

  setImageSrc(event)
  {
    var target=event.target || event.srcElement || event.currentTarget
    var elementIndex=target.attributes.id.value;
    var image = this.elements[elementIndex].image
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:'+image.filename+';base64,'+image.filevalue);
  }

  setSelectedElement(event)
  {
    var target=event.target || event.srcElement || event.currentTarget
    this.selectedElementIndex=target.attributes.id.value;
  }

  submitted=false

  findComplaint()
  {
    if(this.refferenceNumber.valid)
    {
      var complaint=this.elements.find(x => x.refferenceNumber==this.refferenceNumber.value);
      var complaintIndex=this.elements.indexOf(complaint);
      this.elements=this.elements.slice(complaintIndex,complaintIndex+1);
    }
    else if(this.refferenceNumber.invalid)
    {
      this.submitted=true
    }
  }

  addReport()
  {
    var report={
      date:this.date.value,
      startTime:this.startTime.value,
      endTime:this.endTime.value,
      cost:this.cost.value,
      jobTicket:this.jobTicket.value,
      id:this.elements[this.selectedElementIndex]._id
    }
    this.staffService.addReportToComplaint(report).
    subscribe(complaint=>{
      alert("sucessfully added the report")
    })
   
    
  }
  viewAllComplaints()
  {
    this.elements=this.complaintList;
  }

}

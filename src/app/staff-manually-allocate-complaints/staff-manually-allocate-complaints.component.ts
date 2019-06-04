import { Component, OnInit } from '@angular/core';
import { StoreStatusService} from '../store-status.service';
import { StaffServiceService } from '../staff-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import Complaint from '../complaint';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-staff-manually-allocate-complaints',
  templateUrl: './staff-manually-allocate-complaints.component.html',
  styleUrls: ['./staff-manually-allocate-complaints.component.scss']
})
export class StaffManuallyAllocateComplaintsComponent implements OnInit {


  refferenceNumber=new FormControl('',Validators.required);
  index
  selectedElementIndex;
  imagePath
  elements
  complaintList;
  headElements = ['Complaint Number','Refference Number','Customer Name', 'Equipment Name', 'Equipment Fault', 'Phone','Date','Image','Accept'];

  constructor(
  
  public staffService:StaffServiceService,
  private _sanitizer: DomSanitizer,
  private storeStatusService:StoreStatusService,
  ) { }

  ngOnInit() {

    this.index=0;

    this.storeStatusService.setLoginStatus()

    this.staffService.getUnallocatedComplaint()
    .subscribe(complaints=>{
      this.complaintList=complaints
      this.elements=complaints
    })
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

  acceptComplaint(event)
  {
    var target=event.target || event.srcElement || event.currentTarget
    this.selectedElementIndex=target.attributes.id.value;

    
    this.staffService.acceptComplaint(localStorage.getItem('empId'),this.elements[this.selectedElementIndex]._id)
    .subscribe(complaint=>{
      alert("you have sucessfully accepted the complaint")
    })
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

  viewAllComplaints()
  {
    this.elements=this.complaintList;
  }

}

import { Component, OnInit,EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';
import {CustomerServiceService} from '../customer-service.service';
import { MouseEvent } from '@agm/core'; // new //for mouse event

@Component({
  selector: 'app-log-complaints',
  templateUrl: './log-complaints.component.html',
  styleUrls: ['./log-complaints.component.scss']
})
export class LogComplaintsComponent implements OnInit {

  constructor(
    public webSocketService: WebsocketService,
    private storeStatusService: StoreStatusService,
    private fb: FormBuilder,
    private customerService: CustomerServiceService
  ) {}

  public imagePath;
  imgURL: any;
  public message: String;

  //new
  lat = 6.928934;
  lng = 79.848490;
  locationChoosen = false;
  // end new

  logComplaintForm=this.fb.group({
    equipmentName:['',Validators.required],
    equipmentFault:['',Validators.required],
    phone:['',[Validators.required,Validators.pattern('[0-9]+')]],
    address:[''],
    image: null,
    location: null,
    customerId: null

  })

  markLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChoosen = true;
    console.log(event);
    this.logComplaintForm.get('location').setValue({
      latitude: this.lat,
      longitude: this.lng
    });
  }

  get form() { return this.logComplaintForm.controls; }

  notifyStaff(){
    this.webSocketService.notifyStaff();

  }

  submitted=false
  preview(files) {
    if (files.length === 0) {
      return;
    }

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      const file = files[0];
      this.logComplaintForm.get('image').setValue({
        filename: file.name,
        filetype: file.type,
        filevalue: reader.result.toString().split(',')[1]
      });
    };
  }

  onSubmit(){
    if(this.logComplaintForm.valid)
    {

      this.logComplaintForm.get('customerId').setValue(localStorage.getItem('userId'))
      this.customerService.logCustomerComplain(this.logComplaintForm.value)
      .subscribe(complaint=>{
        if(complaint)
        {
          alert('Complaint sucessfully logged your complaint refference number is ' + complaint.refferenceNumber)
          this.webSocketService.notifyStaff();
        }
        else
        {
          alert('please try again');
        }
      }
      )
    }
    else if(this.logComplaintForm.invalid)
    {
      this.submitted=true
    }
  }


  ngOnInit() {
    this.storeStatusService.setLoginStatus();

    this.webSocketService.getNoStaffMembernotfication()
    .subscribe((msg: String) => {
      alert(msg);
    });
  }

}

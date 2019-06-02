import { Component, OnInit,EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';
import {CustomerServiceService} from '../customer-service.service';
import { MapsService } from '../maps.service'; //new


@Component({
  selector: 'app-log-complaints',
  templateUrl: './log-complaints.component.html',
  styleUrls: ['./log-complaints.component.scss']
})
export class LogComplaintsComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: String;

  //new
  lat: string = '';
  lng: string = '';
  location: Object;

  logComplaintForm=this.fb.group({
    equipmentName:[''],
    equipmentFault:[''],
    phone:[''],
    address:[''],
    image: null,
    location: null,
    customerId: null

  })

  notifyStaff(){
    this.webSocketService.notifyStaff();

  }

  constructor(
    public webSocketService: WebsocketService,
    private storeStatusService: StoreStatusService,
    private fb: FormBuilder,
    private customerService: CustomerServiceService,
    private map: MapsService //new

  ) {}


  preview(files) {
    if (files.length === 0){
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      const file = files[0]
      this.logComplaintForm.get('image').setValue({
        filename: file.name,
        filetype: file.type,
        filevalue: reader.result.toString().split(',')[1]
      });
    }
  }

  onSubmit(){
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


  ngOnInit() {
    this.storeStatusService.setLoginStatus()

    this.webSocketService.getNoStaffMembernotfication()
    .subscribe((msg:String)=>{
      alert(msg)
    })

    //new
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.latitude;
      this.lng = data.longitude;
    })
  }

}

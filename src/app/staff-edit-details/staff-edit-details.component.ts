import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';
import { FormBuilder } from '@angular/forms';
import { StaffServiceService} from '../staff-service.service';


@Component({
  selector: 'app-staff-edit-details',
  templateUrl: './staff-edit-details.component.html',
  styleUrls: ['./staff-edit-details.component.scss']
})
export class StaffEditDetailsComponent implements OnInit {

  @ViewChild('alert') alert: ElementRef;

  editStaffDetailsForm=this.fb.group({
    email:[''],
    phone:['']
  })
  
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.setSuccess(false)
  }

  success=false

  getSuccess()
  {
    return this.success
  }

  setSuccess(value:boolean)
  {
    this.success=value;
  }

  constructor(
    public webSocketService:WebsocketService,
    public storeStatusService:StoreStatusService,
    private fb: FormBuilder,
    public staffService:StaffServiceService
  ) { }

  ngOnInit() {
    
    this.editStaffDetailsForm.setValue({
      email:localStorage.getItem('staff.email'),
      phone:localStorage.getItem('staff.phone')
    })

    this.storeStatusService.setLoginStatus()

    this.webSocketService.getNotification()
    .subscribe((msg:String)=>{
      alert(msg)
    })

    this.webSocketService.logActiveStaffUser(localStorage.getItem('empId'))
  }

  onSubmit()
  {
    this.editStaffDetailsForm.value.empId=localStorage.getItem('empId')
    this.staffService.editStaffContactDetails(this.editStaffDetailsForm.value)
    .subscribe(user=>{
      if(user)
      {
        localStorage.setItem('staff.email',user.email)
        localStorage.setItem('staff.phone',user.phone.toString())
        this.setSuccess(true)
      }
    })
  }

}

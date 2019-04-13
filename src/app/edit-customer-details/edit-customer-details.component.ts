import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { StoreStatusService} from '../store-status.service';
import { FormBuilder } from '@angular/forms';
import { last } from '@angular/router/src/utils/collection';
import {CustomerServiceService} from '../customer-service.service'

@Component({
  selector: 'app-edit-customer-details',
  templateUrl: './edit-customer-details.component.html',
  styleUrls: ['./edit-customer-details.component.scss'],
})
export class EditCustomerDetailsComponent implements OnInit{

  @ViewChild('alert') alert: ElementRef;



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
 
  editCustomerDetailsForm=this.fb.group({
    firstName:[''],
    lastName:[''],
    email:[''],
    phone:['']
  })


  constructor(
    public storeStatusService:StoreStatusService,
    private fb: FormBuilder,
    public customerService:CustomerServiceService,
    
  ) { }

  ngOnInit() {
    this.storeStatusService.setLoginStatus()
    this.editCustomerDetailsForm.setValue({
      firstName:localStorage.getItem('firstName'),
      lastName:localStorage.getItem('lastName'),
      email:localStorage.getItem('email'),
      phone:localStorage.getItem('phone')
    })
  }

  onSubmit()
  {
    this.editCustomerDetailsForm.value.nic=localStorage.getItem('userId')
    this.customerService.editCustomerDetails(this.editCustomerDetailsForm.value)
    .subscribe(customer=>{
      if(customer)
      {
        localStorage.setItem('firstName',customer.firstName)
        localStorage.setItem('lastName',customer.lastName)
        localStorage.setItem('email',customer.email)
        localStorage.setItem('phone',customer.phone.toString())
        this.setSuccess(true)
      }
    })
  }

}

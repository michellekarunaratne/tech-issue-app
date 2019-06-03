import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { StoreStatusService} from '../store-status.service';
import { FormBuilder, Validators} from '@angular/forms';
import { last } from '@angular/router/src/utils/collection';
import {CustomerServiceService} from '../customer-service.service'

@Component({
  selector: 'app-edit-customer-details',
  templateUrl: './edit-customer-details.component.html',
  styleUrls: ['./edit-customer-details.component.scss'],
})
export class EditCustomerDetailsComponent implements OnInit{

  @ViewChild('alert') alert: ElementRef;

  submitted=false

 
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
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    phone:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })


  get form() { return this.editCustomerDetailsForm.controls; }

  constructor(
    public storeStatusService:StoreStatusService,
    private fb: FormBuilder,
    public customerService:CustomerServiceService,
    
  ) { }

  ngOnInit() {
    this.storeStatusService.setLoginStatus()
    this.editCustomerDetailsForm.setValue({
      firstName:localStorage.getItem('customer.firstName'),
      lastName:localStorage.getItem('customer.lastName'),
      email:localStorage.getItem('customer.email'),
      phone:localStorage.getItem('customer.phone')
    })
  }

  onSubmit()
  {
    if(this.editCustomerDetailsForm.valid)
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
    else if(this.editCustomerDetailsForm.invalid)
    {
      this.submitted=true;
    }
  }

}

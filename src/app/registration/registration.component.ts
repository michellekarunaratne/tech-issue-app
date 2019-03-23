import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationService} from '../registration.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm=this.fb.group({
    firstName:[''],
    lastName:[''],
    nic:[''],
    email:[''],
    phone:[''],
    password:['']
  })

  onSubmit()
  {
    this.registrationService.registrationCustomer(this.registrationForm.value)
    .subscribe(user =>{
      if(user)
      {
        if(confirm("customer registered sucessfully"))
        {
          this.router.navigate(['/customerDash'])
        }

      }
    })
  }
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService : RegistrationService
  ) { }

  ngOnInit() {
  }

}

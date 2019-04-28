import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegistrationService} from '../registration.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  // constructor(
  //   private fb: FormBuilder,
  //   private router: Router,
  //   private registrationService : RegistrationService
  // ) { }

  // registrationForm = this.fb.group({
  //   firstName:[''],
  //   lastName:[''],
  //   nic:['', Validators.required],
  //   email:['', Validators.required],
  //   phone:[''],
  //   password:['', Validators.required]
  // })

  registrationForm: FormGroup;
    constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService : RegistrationService
    ) {
      this.createForm();
    }

  createForm() {
    this.registrationForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      nic:['', Validators.required],
      email:['', Validators.required],
      phone:[''],
      password:['', Validators.required]
    });
  }

  onSubmit(){
    this.registrationService.registrationCustomer(this.registrationForm.value)
    .subscribe(user =>{
      if(user)
      {
        if(confirm("customer registered sucessfully"))
        {
          this.router.navigate(['/customerDash'])
        }

      }
    });
  }

  ngOnInit() {
  }

}

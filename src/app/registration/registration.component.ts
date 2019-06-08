import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl,FormGroup} from '@angular/forms';
import { RegistrationService} from '../registration.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm=this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    nic:['',Validators.required],
    phone:['',[Validators.required,Validators.pattern('[0-9]+')]],
    password:['',[Validators.required,Validators.minLength(9)]],
    confirmPassword:['',[Validators.required]]
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
  })

  submitted=false
  get form() { return this.registrationForm.controls; }

  onSubmit()
  {
    if(this.registrationForm.valid)
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
    else if (this.registrationForm.invalid)
    {
        this.submitted=true
    }
  }


// custom validator to check that two fields match
 MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService : RegistrationService
  ) { }

  ngOnInit() {
  }

}

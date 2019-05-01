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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    // hide: true
  ) { }

  submitted = false;
  registrationForm = this.fb.group({
    firstName:['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
    lastName:['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
    email:['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
    nic:['', Validators.required],
    phone:['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15)])],
    password:['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
    confirmPassword:['', Validators.required]
  // },
  // {
  //   validator: this.matchingPassword('password', 'confirmPassword')
  });

  ngOnInit() { }

  matchingPassword(password, confirmPassword) {
    if (password === confirmPassword) {
      return true;
    } else {
      alert('Password and Confirm Password are not Match !');
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registrationService.registrationCustomer(this.registrationForm.value)
      .subscribe(user =>{
        // if(user)
        // {
        //   if(confirm("customer registered sucessfully"))
        //   {
        //     this.router.navigate(['/customerDash'])
        //   }

        // }
        if (user.firstName==undefined || user.lastName==undefined || user.email==undefined ||user.nic==undefined || user.password==undefined ) {

          if (this.matchingPassword) {
            if(confirm("customer registered sucessfully"))
            {
              this.router.navigate(['/customerDash']);
            }
          }
        } else {
          alert('All fields are required !');
        }
      });
    } else if (this.registrationForm.invalid) {
      this.submitted = true;
    }


    // if(this.loginForm.valid)
    // {
    //     this.loginService.login(this.loginForm.value)
    //     .subscribe(user =>{

    //       if(user.empId==null && user.nic.includes("v"))
    //       {
    //         localStorage.setItem('customer.firstName',user.firstName)
    //         localStorage.setItem('customer.lastName',user.lastName)
    //         localStorage.setItem('customer.email',user.email)
    //         localStorage.setItem('customer.phone',user.phone.toString())
    //         this.storeStatusService.setLoginStatus()
    //         localStorage.setItem('userId',user.nic)
    //         this.router.navigate(['/customerDash'])
    //       }
    //       else if(user.empId.includes("emp"))
    //       {
    //         localStorage.setItem('staff.firstName',user.firstName)
    //         localStorage.setItem('staff.lastName',user.lastName)
    //         localStorage.setItem('staff.email',user.email)
    //         localStorage.setItem('staff.phone',user.phone.toString())

    //         this.storeStatusService.setLoginStatus()
    //         localStorage.setItem('empId',user.empId)
    //         this.webSocketService.logActiveStaffUser(user.empId)
    //         this.router.navigate(['/staffDash'])
    //       }
    //       else
    //       {
    //         alert("User Not Found")
    //       }
    //     });
    // }

  }
}

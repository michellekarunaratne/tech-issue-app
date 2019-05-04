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
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    nic:['', Validators.required],
    phone:['', [Validators.required, Validators.minLength(10)]],
    password:['', [Validators.required, Validators.minLength(8)]],
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
        this.submitted = true;
        if (user.firstName==undefined || user.lastName==undefined || user.email==undefined ||user.nic==undefined || user.password==undefined || user.confirmPassword==undefined ) {

          if (user.password == user.confirmPassword) {
            if(confirm("customer registered sucessfully"))
            {
              this.router.navigate(['/customerDash']);
            }
          } else {
            alert('Password and Confirm Password are not Match !');
          }
        } else {
          alert('All fields are required 1');
        }
      });
    } else if (this.registrationForm.invalid) {
      alert('Please fill all fields !');
    }
  }
}

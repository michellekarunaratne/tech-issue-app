import { Component, OnInit } from '@angular/core';
import { LoginService} from '../login.service';
import { FormBuilder,Validators  } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted=false
  loginForm=this.fb.group({
    userId:['',Validators.required],
    password:['',Validators.required]

  });

  get form() { return this.loginForm.controls; }

  onSubmit(){

    
    if(this.loginForm.valid)
    {
        this.loginService.login(this.loginForm.value)
        .subscribe(user =>{
        
          if(user.empId==null && user.nic.includes("v"))
          {
            localStorage.setItem('customer.firstName',user.firstName)
            localStorage.setItem('customer.lastName',user.lastName)
            localStorage.setItem('customer.email',user.email)
            localStorage.setItem('customer.phone',user.phone.toString())
            this.storeStatusService.setLoginStatus()
            localStorage.setItem('userId',user.nic)
            this.router.navigate(['/customerDash'])
          }
          else if(user.empId.includes("emp"))
          {
            localStorage.setItem('staff.firstName',user.firstName)
            localStorage.setItem('staff.lastName',user.lastName)
            localStorage.setItem('staff.email',user.email)
            localStorage.setItem('staff.phone',user.phone.toString())
            
            this.storeStatusService.setLoginStatus()
            localStorage.setItem('empId',user.empId)
            this.webSocketService.logActiveStaffUser(user.empId)
            this.router.navigate(['/staffDash'])
          }
          else
          {
            alert("User Not Found")
          }
        });
    }
    else if(this.loginForm.invalid)
    {
      this.submitted=true
    }
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public loginService:LoginService,
    public webSocketService:WebsocketService,
    public storeStatusService:StoreStatusService
    ) { }


  ngOnInit() {
    
  }

  



}

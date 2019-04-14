import { Component, OnInit } from '@angular/core';
import { LoginService} from '../login.service';
import { FormBuilder } from '@angular/forms';
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
  loginForm=this.fb.group({
    userId:[''],
    password:['']

  });

  onSubmit(){

    //console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value)
    .subscribe(user =>{
      localStorage.setItem('firstName',user.firstName)
      localStorage.setItem('lastName',user.lastName)
      localStorage.setItem('email',user.email)
      localStorage.setItem('phone',user.phone.toString())
      if(user.empId==null && user.nic.includes("v"))
      {
        this.storeStatusService.setLoginStatus()
        localStorage.setItem('userId',user.nic)
        this.router.navigate(['/customerDash'])
      }
      else if(user.empId.includes("emp"))
      {
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

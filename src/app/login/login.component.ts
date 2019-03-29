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
  styleUrls: ['./login.component.css']
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
      if(user.userId.includes("v"))
      {
        this.storeStatusService.setLoginStatus()
        this.router.navigate(['/customerDash'])
      }
      else if(user.userId.includes("emp"))
      {
        this.storeStatusService.setLoginStatus()
        this.webSocketService.logActiveStaffUser(user.userId)
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

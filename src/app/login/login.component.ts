import { Component, OnInit } from '@angular/core';
import { LoginService} from '../login.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


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
      if(user)
      {
        this.router.navigate(['/customerDash'])
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
    ) { }


  ngOnInit() {
  }

  



}

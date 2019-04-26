import { Injectable } from '@angular/core';
import Customer from './customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import User from './user'
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private url='http://localhost:4000/userRegistration';


  registrationCustomer(customer:Customer):Observable<User>
  {
    return this.http.post<User>(`${this.url}/customer`,customer)
  }

  constructor(
    private http:HttpClient
  ) { }

  validateRegistration() {

  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

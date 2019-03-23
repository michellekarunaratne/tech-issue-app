import { Injectable } from '@angular/core';
import Customer from './customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import User from './user'

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
}

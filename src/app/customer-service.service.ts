import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Customer from './customer';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private url='http://localhost:4000/customer';

  constructor(private http:HttpClient) { }

  editCustomerDetails(customer:Customer):Observable<Customer>
  {
    return this.http.post<Customer>(`${this.url}/editCustomerDetails`,customer)
  }

  logCustomerComplain(){
    
  }
}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import Customer from './customer';
import { Observable } from 'rxjs';
import Complaint from './complaint';
import { catchError, map, tap } from 'rxjs/operators';


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

  logCustomerComplain(complaint:Complaint)
  {
    return this.http.post<Complaint>(`${this.url}/logComplaints`,complaint) 
  }

  viewCustomerComplaints(userId)
  {
    const params= new HttpParams()
    .set('userId',userId)
    return this.http.get<Complaint[]>(`${this.url}/viewComplaints`,{params})
  }


}

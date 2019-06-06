import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import Complaint from './complaint';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url='http://localhost:4000/admin';


  constructor(private http:HttpClient) { }

  getAllocatedComplaintsByYear(currentYear)
  {
    const params= new HttpParams()
    .set('currentYear',currentYear) 
    return this.http.get(`${this.url}/getAllocatedComplaintsByYear`,{params})
  }

  getUnallocatedComplaintsByYear(currentYear)
  {
    const params= new HttpParams()
    .set('currentYear',currentYear) 
    return this.http.get<Complaint[]>(`${this.url}/getUnallocatedComplaintsByYear`,{params})
  }
}

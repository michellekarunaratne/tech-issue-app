import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Complaint from './complaint';
import User from './user';
import Report from './report';


@Injectable({
  providedIn: 'root'
})
export class StaffServiceService {

  private url='http://localhost:4000/staff';

  constructor(
    private http:HttpClient
  ) { }

  getAllocatedComplaints(empId)
  {
    const params= new HttpParams()
    .set('empId',empId)
    return this.http.get<Complaint[]>(`${this.url}/viewAllocatedComplaints`,{params})
  }

  editStaffContactDetails(staff):Observable<User>
  {
    return this.http.post<User>(`${this.url}/editDetails`,staff)
  }

  addReportToComplaint(report)
  {
    return this.http.post<Complaint>(`${this.url}/addReport`,report)
  }

}

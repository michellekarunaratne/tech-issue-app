import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from './user';
import { catchError, retry } from 'rxjs/operators';
import Customer from './customer';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userId:String;

  private url='http://localhost:4000/userLogin';

  constructor(private http:HttpClient) {}

  getUserId()
  {
    return this.userId;
  }

  setUserId(userId)
  {
    this.userId=userId;
  }
  login(user:User):Observable<User>
  {
      this.setUserId(user.userId)
      return this.http.post<User>(this.url,user) 
  }

}

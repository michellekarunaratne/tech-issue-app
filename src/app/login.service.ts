import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from './user';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url='http://localhost:4000/userLogin';

  constructor(private http:HttpClient) {}

  login(user:User):Observable<User>
  {
      return this.http.post<User>(this.url,user) 
  }

}

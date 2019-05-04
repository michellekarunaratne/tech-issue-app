import { Injectable } from '@angular/core';
import Customer from './customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import User from './user';
import { FormGroup } from '@angular/forms'; //new

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

// custom validator to check that two fields match // (new)
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // return null if controls haven't initialised yet
      if (!control || !matchingControl) {
        return null;
      }

      // return null if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }// (end new adding)
}

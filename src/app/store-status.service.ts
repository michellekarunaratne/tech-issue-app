import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreStatusService {
  private loginStatus;

  constructor() { }

  setLoginStatus()
  {
    this.loginStatus=true
  }

  setLogoutStatus()
  {
    this.loginStatus=false
  }

  getLoginStatus()
  {
    return this.loginStatus
  }
}

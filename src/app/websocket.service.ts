import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket:SocketIOClient.Socket;
  

  constructor() { 
    this.socket=io('http://localhost:4000');
  }

  
  logActiveStaffUser(userId) {
    
      this.socket.emit('login',userId)
  }

  notifyStaff(){
    this.socket.emit('notifyStaff',localStorage.getItem('userId'))
   
  }

  getNotification(){
    return new Observable((observable)=>{
      this.socket.on('staffMemberNotification',(msg)=>{
        observable.next("You have a complaint to attend to")
      })
    })

  }

  getNoStaffMembernotfication(){
    return new Observable((observable)=>{
      this.socket.on('NoStaffMemberNotification',(msg)=>{
        observable.next("No Avaialable staff member to allocate complaints")
      })
    })
  }
}

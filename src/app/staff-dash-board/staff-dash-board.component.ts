import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../websocket.service';



@Component({
  selector: 'app-staff-dash-board',
  templateUrl: './staff-dash-board.component.html',
  styleUrls: ['./staff-dash-board.component.scss']
})
export class StaffDashBoardComponent implements OnInit {

  constructor(
    public webSocketService:WebsocketService,
    
  ) { }

  ngOnInit() {
    
    this.webSocketService.getNotification()
    .subscribe((msg:String)=>{
      alert(msg)
    })

    console.log(localStorage.getItem('empId'))
    this.webSocketService.logActiveStaffUser(localStorage.getItem('empId'))
   
  }

}

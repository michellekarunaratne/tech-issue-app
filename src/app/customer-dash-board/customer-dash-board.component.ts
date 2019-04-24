import { Component, OnInit } from '@angular/core';
import { StoreStatusService} from '../store-status.service';
import {WebsocketService} from '../websocket.service';

@Component({
  selector: 'app-customer-dash-board',
  templateUrl: './customer-dash-board.component.html',
  styleUrls: ['./customer-dash-board.component.scss']
})
export class CustomerDashBoardComponent implements OnInit {

  constructor(
    public storeStatusService:StoreStatusService,
    public webSocketService:WebsocketService,
  ) { }

  ngOnInit() {
    this.storeStatusService.setLoginStatus()

    this.webSocketService.getNoStaffMembernotfication()
    .subscribe((msg:String)=>{
      alert(msg)
    })
    

  }

}

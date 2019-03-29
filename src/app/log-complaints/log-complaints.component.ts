import { Component, OnInit,EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';


@Component({
  selector: 'app-log-complaints',
  templateUrl: './log-complaints.component.html',
  styleUrls: ['./log-complaints.component.scss']
})
export class LogComplaintsComponent implements OnInit {

 
  notifyStaff(){
    this.webSocketService.notifyStaff();

  }

  constructor(
    public webSocketService:WebsocketService,
    private storeStatusService:StoreStatusService

  ) {}

  ngOnInit() {
    this.storeStatusService.setLoginStatus()
  }

}

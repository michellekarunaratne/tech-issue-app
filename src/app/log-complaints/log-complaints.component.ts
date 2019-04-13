import { Component, OnInit,EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {WebsocketService} from '../websocket.service';
import { StoreStatusService} from '../store-status.service';
import { read } from 'fs';

@Component({
  selector: 'app-log-complaints',
  templateUrl: './log-complaints.component.html',
  styleUrls: ['./log-complaints.component.scss']
})
export class LogComplaintsComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: String;

  logComplaintForm=this.fb.group({
    equipmentName:[''],
    equipmentFault:[''],
    phone:[''],
    address:[''],
    image:null

  })
 
  notifyStaff(){
    this.webSocketService.notifyStaff();

  }

  constructor(
    public webSocketService:WebsocketService,
    private storeStatusService:StoreStatusService,
    private fb:FormBuilder

  ) {}


  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
      let file=files[0]
      this.logComplaintForm.get('image').setValue({
        filename: file.name,
        filetype: file.type,
        value: reader.result.toString().split(',')[1]
      })
    }
    
  }

  onSubmit(){
    
  }


  ngOnInit() {
    this.storeStatusService.setLoginStatus()
  }

}

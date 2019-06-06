import Report from './report';

export default class Complaint{
    _id:string;
    refferenceNumber:string;
    equipmentName:string;
    equipmentFault:string;
    phone:string;
    address:string;
    image:{
        filename:string;
        filetype:string;
        filevalue:string;
    }
    location:{//new
      latitude:String,//new
      longitude:String//new
    }
    customerId:String;
    allocatedStaff:Boolean;
    date:Date;
    report:Report;
    dateSep :{
      year:string;
      month: string;
  }
}

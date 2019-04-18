import Report from './report';

export default class Complaint{
    _id:string;
    equipmentName:string;
    equipmentFault:string;
    phone:string;
    address:string;
    image:{
        filename:string;
        filetype:string;
        filevalue:string;
    }
    customerId:String;
    allocatedStaff:Boolean;
    date:Date;
    report:Report
}
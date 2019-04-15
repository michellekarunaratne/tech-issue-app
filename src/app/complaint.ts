
export default class Complaint{
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
}
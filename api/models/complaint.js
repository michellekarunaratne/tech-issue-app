const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const StaffSchema=require('../models/staff')
const EquipmentSchema=require('../models/equipment')
const ReportSchema=require('../models/report')



////including embedded documents into the document
var Customer=require('mongoose').model('Customer').schema
var Staff=require('mongoose').model('Staff').schema
var Report=require('mongoose').model('Report').schema


var complaintSchema= new Schema (
    {
       refferenceNumber:String,
       equipmentName:String,
       equipmentFault:String,
       image:{
           filename:String,
           filetype:String,
           filevalue:String
       },
       location:{//new
         latitude:String,//new
         longitude:String//new
       },
       phone:Number,
       address:String,
       allocatedStaff:{type:Boolean,default:false},
       customer:Customer,
       staff:Staff,
       date:String,
       report:Report
       //equipment:[Equipment],

    }
)



module.exports= mongoose.model('Complaint',complaintSchema);

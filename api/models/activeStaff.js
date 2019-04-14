const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const StaffSchema=require('../models/staff')


////including embedded documents into the document
var Staff=require('mongoose').model('Staff').schema



var activeStaffSchema= new Schema (
    {
      //staff:[Staff],
      userId:String,
      socketId:String,
      loginStamp:{ type : Date, default:new Date()},
      
    }
)

module.exports= mongoose.model('ActiveStaff',activeStaffSchema);
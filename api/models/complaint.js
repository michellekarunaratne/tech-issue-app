const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const StaffSchema=require('../models/staff')
const EquipmentSchema=require('../models/equipment')


////including embedded documents into the document
var Customer=require('mongoose').model('Customer').schema
var Staff=require('mongoose').model('Staff').schema
var Equipment=require('mongoose').model('Equipment').schema


var complaintSchema= new Schema (
    {
       equipmentName:String,
       equipmentFault:String,
       image:{
           filename:String,
           filetype:String,
           filevalue:String
       },
       phone:Number,
       address:String,
       customer:[Customer],
       Staff:[Staff],
       //equipment:[Equipment],
       
    }
)

module.exports= mongoose.model('Complaint',complaintSchema);
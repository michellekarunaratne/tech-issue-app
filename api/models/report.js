const mongoose=require('mongoose');
const Schema =mongoose.Schema;

////including embedded documents into the document
//var Complaint=require('mongoose').model('Complaint').schema
var Staff=require('mongoose').model('Staff').schema


var reportSchema= new Schema (
    {
      date:String,
      startTime:String,
      endTime:String,
      cost:Number,
      jobTicket:String,
    }
)

module.exports= mongoose.model('Report',reportSchema);
const mongoose=require('mongoose');
const Schema =mongoose.Schema;

////including embedded documents into the document
var Customer=require('mongoose').model('Customer').schema
var Equipment=require('mongoose').model('Equipment').schema

var complaintSchema= new Schema (
    {
       Location:String,
       Defect:String,
       Picture:String,
       Customer:[Customer],
       Equipment:[Equipment]
    }
)

module.exports= mongoose.model('Complaint',complaintSchema);
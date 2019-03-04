const mongoose=require('mongoose');
const Schema =mongoose.Schema;

////including embedded documents into the document
var Staff=require('mongoose').model('Staff').schema



var complaintSchema= new Schema (
    {
      Staff:[Staff],
      LoginStamp:Date
    }
)

module.exports= mongoose.model('Complaint',complaintSchema);
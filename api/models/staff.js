const mongoose=require('mongoose');
const Schema =mongoose.Schema;


var staffSchema= new Schema (
    {
        firstName:String,
        lastName:String,
        nic:String,
        employeeId:String
    }
)

module.exports=mongoose.model('Staff',staffSchema);
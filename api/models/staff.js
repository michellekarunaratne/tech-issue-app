const mongoose=require('mongoose');
const Schema =mongoose.Schema;


var staffSchema= new Schema (
    {
        firstName:String,
        lastName:String,
        nic:String,
        empId:String,
        email:String,
        phone:Number,
    }
)

module.exports=mongoose.model('Staff',staffSchema);
const mongoose=require('mongoose');
const Schema =mongoose.Schema;

var staffSchema= new Schema (
    {
        firstName:String,
        lastName:String,
        Nic:String,
        EmployeeId:String
    }
)

module.exports= mongoose.model('Staff',staffSchema);

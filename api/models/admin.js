const mongoose=require('mongoose');
const Schema =mongoose.Schema;

var adminSchema= new Schema (
    {
        firstName:String,
        lastName:String,
        nic:String,
        email:String,
        phone:Number,
        adminId:String
    }
)

module.exports= mongoose.model('Admin',adminSchema);

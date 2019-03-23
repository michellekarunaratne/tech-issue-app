const mongoose=require('mongoose');
const Schema =mongoose.Schema;

var customerSchema= new Schema (
    {
        firstName:String,
        lastName:String,
        nic:String,
        email:String,
        contactNumber:Number
    }
)

module.exports= mongoose.model('Customer',customerSchema);
